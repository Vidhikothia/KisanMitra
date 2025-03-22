from flask import Flask, request, render_template, url_for
import pickle
import numpy as np

# Load the trained model
with open('crop_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__)

# Dictionary mapping crop names to image filenames
crop_images = {
    'rice': 'rice.jpg',
    'maize': 'maize.jpg',
    'chickpea': 'chickpea.jpg',
    'kidneybeans': 'kidneybeans.jpg',
    'pigeonpeas': 'pigeonpeas.jpg',
    'mothbeans': 'mothbeans.jpg',
    'mungbeans': 'mungbeans.jpg',
    'blackgram': 'blackgram.jpg',
    'lentil': 'lentil.jpg',
    'pomegranate': 'pomegranate.jpg',
    'banana': 'banana.jpg',
    'mango': 'mango.jpg',
    'grapes': 'grapes.jpg',
    'watermelon': 'watermelon.jpg',
    'muskmelon': 'muskmelon.jpg',
    'apple': 'apple.jpg',
    'orange': 'orange.jpg',
    'papaya': 'papaya.jpg',
    'coconut': 'coconut.jpg',
    'cotton': 'cotton.jpg',
    'jute': 'jute.jpg',
    'coffee': 'coffee.jpg'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    N = float(request.form['N'])
    P = float(request.form['P'])
    K = float(request.form['K'])
    temperature = float(request.form['temperature'])
    humidity = float(request.form['humidity'])
    pH = float(request.form['pH'])
    rainfall = float(request.form['rainfall'])
    
    # Predict the crop
    features = np.array([[N, P, K, temperature, humidity, pH, rainfall]])
    prediction = model.predict(features)[0]
    
    # Get the image file name for the predicted crop
    image_path = f'images/{crop_images.get(prediction.lower(), "default.jpg")}'
    
    # Render result to the HTML page
    return render_template('index.html', prediction=prediction, image_path=image_path)

if __name__ == '__main__':
    app.run(debug=True)