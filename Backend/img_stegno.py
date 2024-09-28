# from PIL import Image
# import numpy as np
# from io import BytesIO

# class IMG_Stegno:
#     def __init__(self, custom_bit=1):
#         self.custom_bit = custom_bit

#     # Function to encode text into image
#     def encode(self, file_path, text):
#         # Open the image
#         img = Image.open(file_path)
        
#         # Convert the image to numpy array
#         img_array = np.array(img)

#         # Convert the text to binary and append end-of-message marker
#         binary_text = ''.join(format(ord(char), '08b') for char in text)
#         binary_text += '00000000'  # End-of-message marker

#         # Get the shape of the image
#         height, width, _ = img_array.shape

#         # Calculate the maximum length of text that can be encoded
#         max_text_length = height * width * 3 // self.custom_bit

#         # Ensure the text length does not exceed the maximum limit
#         if len(binary_text) > max_text_length:
#             raise ValueError("Text is too long to be encoded in the image")

#         # Flatten the image array
#         img_array_flat = img_array.flatten()

#         # Encode the text into the LSB of each pixel value
#         for i, bit in enumerate(binary_text):
#             img_array_flat[i] = img_array_flat[i] & ~(1 << (self.custom_bit - 1)) | (int(bit) << (self.custom_bit - 1))

#         # Reshape the flattened array back to the original shape
#         img_encoded = img_array_flat.reshape((height, width, 3))

#         # Create a PIL image from the encoded numpy array
#         encoded_img = Image.fromarray(img_encoded.astype('uint8'))

#         # Return the encoded image without saving the original
#         return encoded_img

#     # Function to decode text from raw image data
#     def decode(self, image_data):
#         # Open the image from raw data
#         img = Image.open(BytesIO(image_data))

#         # Convert the image to numpy array
#         img_array = np.array(img)

#         # Flatten the image array and convert to integers
#         img_array_flat = np.fromiter(img_array.flat, dtype=np.uint8)

#         # Extract the LSB of each pixel value to decode the text
#         binary_text = ''.join(str((int(pixel) >> (self.custom_bit - 1)) & 1) for pixel in img_array_flat)

#         # Find the index of the end-of-message marker
#         end_index = binary_text.find('00000000')

#         # Get the binary text without the end-of-message marker
#         binary_text = binary_text[:end_index]

#         # Convert binary text to ASCII characters
#         text = ''.join(chr(int(binary_text[i:i+self.custom_bit*8:self.custom_bit], 2)) for i in range(0, len(binary_text), self.custom_bit*8))

#         return text

########################################################################################################################################################################################################

from stegano import lsb
from PIL import Image
from io import BytesIO

class IMG_Stegno:
    def __init__(self, custom_bit=1):
         self.custom_bit = custom_bit

    def encode(self, file_path, text):
        # Open the image using PIL
        img = Image.open(file_path)

        # Use stegano library to hide text in the image using LSB steganography
        secret_image = lsb.hide(img, text)

        # Return the encoded image
        return secret_image

    def decode(self, image_data):
        # Open the image from raw image data
        img = Image.open(BytesIO(image_data))

        # Use stegano library to reveal hidden text from the image using LSB steganography
        decoded_text = lsb.reveal(img)

        return decoded_text
