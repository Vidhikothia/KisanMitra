from flask import Flask, request, render_template
import pickle
import numpy as np

# Load the trained model
with open('crop_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__)

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

    # Predict crop
    features = np.array([[N, P, K, temperature, humidity, pH, rainfall]])
    prediction = model.predict(features)
    return render_template('index.html', prediction=prediction[0])

if __name__ == '__main__':
    app.run(debug=True)
