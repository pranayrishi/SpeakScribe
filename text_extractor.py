import pytesseract
from PIL import Image

# Step 1: Configure Tesseract Path (Uncomment and set the path if on Windows)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_image(image_path):
    """Extract text from an image using Tesseract."""
    try:
        image = Image.open(image_path)
        extracted_text = pytesseract.image_to_string(image)
        return extracted_text
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return ""

def save_text_to_file(text, filename='extracted_text.txt'):
    """Save extracted text to a file."""
    try:
        with open(filename, 'w') as text_file:
            text_file.write(text)
        print(f"Extracted text saved as {filename}.")
    except Exception as e:
        print(f"Error saving text to file: {e}")

def main():
    image_path = 'screenshot.png'  # The pre-existing screenshot in the directory

    # Extract text from the provided screenshot
    extracted_text = extract_text_from_image(image_path)

    # Print the extracted text
    if extracted_text:
        print("Extracted Text:")
        print(extracted_text)

        # Save the extracted text to a file
        save_text_to_file(extracted_text)

if __name__ == "__main__":
    main()
