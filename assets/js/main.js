
/* javascript */
const apiKey = "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";
const maxImages = 6;
let imageNumber = null;

function randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//clear grid
function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

// function to generate images
async function generateImages(input) {
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const imageUrls = [];

    for (let i = 0; i < maxImages; i++) {
        // generate a random number between 1 and 10000 and append it to the prompt
        const randomNumber = randomNumberGen(1, 10000);
        const prompt = `${input} ${randomNumber}`;
        // add random number to prompt to create different results
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            alert("Failed to generate image!");
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        imageUrls.push(imgUrl);

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `art-${i + 1}`;
        document.getElementById("image-grid").appendChild(img);
    }

    loading.style.display = "none";

    selectedImageNumber = null; // reset selected image number
}

document.getElementById("generate").addEventListener('click', () => {
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
});


