const apiKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const imageUploadURL = process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL;
const hostingURL = `${imageUploadURL}?key=${apiKey}`;

export const getImageURL = async (image: File) => {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch(`${hostingURL}`, {
        method: "POST",
        body: formData
    })
    return res.json();
}