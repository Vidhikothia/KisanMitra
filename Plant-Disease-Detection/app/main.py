import os
import json
from PIL import Image #Python Imaging Library
import numpy as np  
import tensorflow as tf  
import streamlit as st 

working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = f"{working_dir}/trained_model/plant_disease_prediction_model.h5"
model = tf.keras.models.load_model(model_path)
class_indices = json.load(open(f"{working_dir}/class_indices.json"))  #to interpret models o/p

def load_and_preprocess_image(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.0   #scales values between 0 and 1 (normalizes)
    return img_array

def predict_image_class(model, image_path, class_indices):
    preprocessed_img = load_and_preprocess_image(image_path)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_indices[str(predicted_class_index)]
    confidence_score = predictions[0][predicted_class_index]
    return predicted_class_name, confidence_score

st.title("🌱 Plant Disease Detection System")

st.sidebar.title("⚙️ App Settings")
target_width = st.sidebar.slider("Image Width", 50, 500, 224, step=10)
target_height = st.sidebar.slider("Image Height", 50, 500, 224, step=10)
show_confidence = st.sidebar.checkbox("🔍 Show Confidence Score", True)
show_report = st.sidebar.checkbox("📄 Show Prediction Report", True)

uploaded_image = st.file_uploader("📂 Upload an image of a plant leaf and detect possible diseases!", type=["jpg", "jpeg", "png"])

# Processing the uploaded image
if uploaded_image is not None:
    image = Image.open(uploaded_image)
    st.write("✅ **Image Uploaded Successfully!**")
    
    col1, col2 = st.columns(2)
    with col1:
        st.image(image, caption="🌿 Original Image", use_column_width=True)
        st.write(f"🔢 **Original Dimensions:** {image.size}")
    with col2:
        resized_img = image.resize((target_width, target_height))
        st.image(resized_img, caption=f"Resized ({target_width}x{target_height})")
    
    if st.button("🧪 Detect Disease"):
        with st.spinner("🔬 Analyzing the image..."):
            prediction, confidence = predict_image_class(
                model, uploaded_image, class_indices
            )
            st.success(f"🌟 **Predicted Class:** {prediction}")
            if show_confidence:
                st.info(f"💡 **Confidence Score:** {confidence:.2%}")
            
            # Show detailed report if enabled
            if show_report:
                report = {
                    "Predicted Class": prediction,
                    "Confidence Score": f"{confidence:.2%}",
                    "Target Dimensions": f"{target_width}x{target_height}",
                }
                st.write("📊 **Prediction Report:**")
                st.json(report)
                
                st.download_button(
                    label="💾 Download Report",
                    data=json.dumps(report, indent=4),
                    file_name="prediction_report.json",
                    mime="application/json",
                )

# Footer
st.markdown(
    """
    ---
    🌿 *Developed with ❤️ for KisanMitra.*
    """
)
