from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from flask import Flask
from flask_cors import CORS
import os
from img_stegno import IMG_Stegno

app = Flask(__name__)
img_stegno = IMG_Stegno()
CORS(app)
CORS(app, origins='http://localhost:5173')
# Define the destination directory for saving encrypted images
DEST_DIR = "C:\\Users\\astha\\Desktop\\Images"



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encode', methods=['POST'])
def encode():
    myfile = request.files['file']
    text = request.form['text']
    
    if not myfile:
        return "Error: No file selected"
    
    # Ensure the destination directory exists
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
    
    # Generate a secure filename
    filename = secure_filename(myfile.filename)
    
    # Construct the full file path
    file_path = os.path.join(DEST_DIR, filename)
    
    # Save the uploaded file to the destination directory
    myfile.save(file_path)
    
    # Call the encode function with the saved file path
    encoded_image = img_stegno.encode(file_path, text)
    
    # Construct the new filename with "enc_" prefix
    new_filename = "enc_" + filename
    
    # Construct the full path for the new filename
    new_file_path = os.path.join(DEST_DIR, new_filename)
    
    # Save the encoded image with the new filename
    encoded_image.save(new_file_path)
    
    # Return a success message with the link to the encoded image
    return f"Encoding successful. Encrypted image saved as: <a href='{new_file_path}'>{new_filename}</a>"

@app.route('/decode', methods=['POST'])
def decode():
    myfile = request.files['file']
    
    if not myfile:
        return "Error: No file selected"
    
    # Read the content of the uploaded file as bytes
    file_content = myfile.read()
    
    # Call the decode function with the file content
    decoded_text = img_stegno.decode(file_content)
    
    return decoded_text

if __name__ == '__main__':
    app.run(debug=True)
