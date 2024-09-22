import openai
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.utils import simpleSplit  # This is for text wrapping


# Set up the OpenAI API key
openai.api_key = "OPENAI_API_KEY"

# Function to get a tailored assignment from GPT
def get_assignment(learning_style, chapter_summary):
    # Define the learning style-specific prompts
    prompts = {
        'audio': f"Generate an engaging assignment for students who prefer audio learning that aligns with the {chapter_summary} and their course objectives. The assignment should be feasible for teachers to assign and manageable for students, enhancing their learning experience. Provide a concise description of the assignment in 1-2 sentences, ensuring it encourages active participation and utilizes auditory elements, such as creating a podcast or participating in a group discussion, to help students succeed in their coursework.",
        'kinesthetic': f"Generate an engaging assignment for students who prefer kinesthetic learning that aligns with the {chapter_summary} their course objectives. The assignment should be feasible for teachers to assign and manageable for students, enhancing their learning experience through hands-on activities. Provide a concise description of the assignment in 1-2 sentences, ensuring it encourages physical interaction with the material, such as building a model or conducting a science experiment, to help students succeed in their coursework.",
        'visual': f"Create an engaging assignment for students who prefer visual learning that aligns with the {chapter_summary} their course objectives. The assignment should be easy for teachers to assign and not overwhelming for students, enhancing their understanding through visual elements. Provide a brief description of the assignment in 1-2 sentences, ensuring it encourages the use of diagrams, infographics, or visual presentations to effectively convey key concepts and support student success in their coursework.",
        'reading/writing': f"Develop an engaging assignment for students who prefer reading and writing that aligns with the {chapter_summary} their course objectives. The assignment should be straightforward for teachers to assign and manageable for students, facilitating their understanding through written expression. Provide a concise description of the assignment in 1-2 sentences, ensuring it encourages research, reflection, or essay writing to deepen comprehension and promote success in their coursework."
    }

    # Get the tailored assignment from GPT based on the learning style
    prompt = prompts.get(learning_style, "Create a general assignment based on this chapter.")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Updated to use model
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )

    return response['choices'][0]['message']['content'].strip()  # Access the content properly


# Function to create PDF from text input
def create_pdf(text_input, filename="worksheet.pdf"):
    # Create a canvas object with A4 page size
    pdf = canvas.Canvas(filename, pagesize=A4)

    # Set font and size
    pdf.setFont("Helvetica", 12)

    # Define margin and starting position
    width, height = A4
    x_margin, y_margin = 40, 800  # Starting x and y positions
    line_height = 20  # Space between lines

    # Define maximum line width (so text wraps within margins)
    max_line_width = width - 2 * x_margin

    # Split the input text into paragraphs (if text has multiple lines)
    paragraphs = text_input.split('\n')

    # Loop through paragraphs and draw them on the PDF
    for paragraph in paragraphs:
        # Split long paragraphs into lines that fit within the margins
        lines = simpleSplit(paragraph, 'Helvetica', 12, max_line_width)

        for line in lines:
            if y_margin < 50:  # Check if you need a new page
                pdf.showPage()  # Create a new page
                pdf.setFont("Helvetica", 12)
                y_margin = 800

            # Draw the current line
            pdf.drawString(x_margin, y_margin, line)

            # Move the y position down for the next line
            y_margin -= line_height

    # Save the PDF
    pdf.save()

# Student input
def student_interface():
    print("Welcome to the AI Learning Assignment Program")

    # Ask for student name
    student_name = input("Enter your name: ")

    # Ask for learning preference
    print("Choose your preferred learning style:")
    print("1. Audio")
    print("2. Kinesthetic")
    print("3. Visual")
    print("4. Reading/Writing")

    choice = input("Enter 1, 2, 3, or 4: ")

    learning_style = ""
    if choice == "1":
        learning_style = "audio"
    elif choice == "2":
        learning_style = "kinesthetic"
    elif choice == "3":
        learning_style = "visual"
    elif choice == "4":
        learning_style = "reading/writing"
    else:
        print("Invalid choice, defaulting to general assignment.")
        learning_style = "general"

    # Read chapter summary from the extracted text file
    try:
        with open('extracted_text.txt', 'r') as file:
            chapter_summary = file.read()
    except FileNotFoundError:
        print("Error: 'extracted_text.txt' file not found. Please run the text extractor first.")
        return

    # Get tailored assignment from GPT
    assignment = get_assignment(learning_style, chapter_summary)

    # Create PDF content
    pdf_content = f"Student: {student_name}\nLearning Style: {learning_style.capitalize()}\n\n{assignment}"

    # Generate PDF
    create_pdf(pdf_content, filename=f"{student_name}_worksheet.pdf")

    print(f"\nHi {student_name}, your tailored assignment has been generated and saved as {student_name}_worksheet.pdf.")


# Run the student interface
if __name__ == '__main__':
    student_interface()
