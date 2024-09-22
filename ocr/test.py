from PIL import Image
import pytesseract
import pdfplumber
import docx
import os
import glob
import time

def read_image(file_path):
    img = Image.open(file_path)
    return pytesseract.image_to_string(img)

def read_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        return text

def read_docx(file_path):
    doc = docx.Document(file_path)
    full_text = []
    for paragraph in doc.paragraphs:
        full_text.append(paragraph.text)
    return '\n'.join(full_text)

def process_file(file_path):
    ext = os.path.splitext(file_path)[-1].lower()

    if ext in ['.png', '.jpg', '.jpeg']:
        return read_image(file_path)
    elif ext == '.pdf':
        return read_pdf(file_path)
    elif ext == '.docx':
        return read_docx(file_path)
    else:
        return "Format don't supported."


def search_files():
    extensions = ['*.png', '*.jpg', '*.jpeg', '*.pdf', '*.docx']
    
    found_files = []
    
    for extension in extensions:
        found_files.extend(glob.glob(extension))

    for file in found_files:
        start_time = time.time()  # Start time measurement
        result = process_file(file)
        end_time = time.time()  # End time measurement
        execution_time = end_time - start_time  # Calculate execution time
        print(f"File: {file}, Result: {result}, Execution Time: {execution_time:.4f} seconds")
        print('-' * 20)

search_files()