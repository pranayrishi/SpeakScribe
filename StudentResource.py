import openai
import requests
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
from PIL import Image
from io import BytesIO
import time

# Set up your API keys
openai.api_key = "OPENAI_API_KEY"
serpapi_api_key = "API_KEY"


# Function to summarize chapter and highlight key points
def summarize_chapter(chapter_summary):
    summary_prompt = f"Please summarize the following chapter and highlight the key points and key vocabulary:\n\n{chapter_summary}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": summary_prompt}],
        max_tokens=500
    )
    return response['choices'][0]['message']['content'].strip()

# Function to generate a search query for resources
def generate_query(input_text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": f"Generate a search query based on this text: {input_text}"}]
    )
    return response['choices'][0]['message']['content'].strip()

# Function to fetch relevant links
def get_links(query):
    search_url = "https://serpapi.com/search"
    params = {
        "q": query,
        "engine": "google",
        "api_key": serpapi_api_key
    }

    response = requests.get(search_url, params=params)
    response.raise_for_status()
    search_results = response.json()

    links = [result["link"] for result in search_results.get("organic_results", [])]
    return links


# Function to generate images based on text prompt
def generate_images_from_text(prompt, num_images=1):
    response = openai.Image.create(
        prompt=prompt,
        n=num_images,
        size="1024x1024"
    )
    return [data['url'] for data in response['data']]


# Function to create a PDF
def create_pdf(content, filename="worksheet.pdf"):
    pdf = canvas.Canvas(filename, pagesize=A4)
    pdf.setFont("Helvetica", 12)
    width, height = A4
    x_margin, y_margin = 40, 800
    line_height = 20
    max_line_width = width - 2 * x_margin

    for paragraph in content.split('\n'):
        lines = simpleSplit(paragraph, 'Helvetica', 12, max_line_width)
        for line in lines:
            if y_margin < 50:
                pdf.showPage()
                pdf.setFont("Helvetica", 12)
                y_margin = 800
            pdf.drawString(x_margin, y_margin, line)
            y_margin -= line_height

    pdf.save()


# Student interface
def student_interface():
    print("Welcome to the AI Learning Assignment Program")

    student_name = input("Enter your name: ")
    learning_style = input(
        "Choose your preferred learning style (audio, kinesthetic, visual, reading/writing): ").lower()

    # Read chapter summary
    try:
        with open('extracted_text.txt', 'r') as file:
            chapter_summary = file.read()
    except FileNotFoundError:
        print("Error: 'extracted_text.txt' file not found.")
        return

    # Summarize chapter and get links
    chapter_content = summarize_chapter(chapter_summary)

    # Split the content into summary, key points, and vocabulary
    summary, key_points, key_vocabulary = chapter_content.split("\n\n")  # Assuming specific formatting
    query = generate_query(chapter_summary)
    resources = get_links(query)

    # Generate images
    image_prompts = f"Generate an image related to this chapter: {chapter_summary}"
    image_urls = generate_images_from_text(image_prompts)

    # Create PDF content
    pdf_content = (
            f"Student: {student_name}\n"
            f"Learning Style: {learning_style.capitalize()}\n\n"
            f"\n{summary}\n\n"
            f"\n{key_points}\n\n"
            f"\n{key_vocabulary}\n\n"
            f"Resources:\n" + "\n".join(resources) + "\n\n"
                                                    # f"Image URLs:\n" + "\n".join(image_urls)
    )

    # Generate PDF
    create_pdf(pdf_content, filename=f"{student_name}_worksheet.pdf")
    print(
        f"\nHi {student_name}, your tailored assignment has been generated and saved as {student_name}_worksheet.pdf.")


if __name__ == '__main__':
    student_interface()
