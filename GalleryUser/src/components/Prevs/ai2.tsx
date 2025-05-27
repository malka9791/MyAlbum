import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../hook/user_context";

type Image = {
  id: number;
  name: string;
  description: string;
  emotions: string;
  imgUrl: string;
  imgType: string;
  createdAt: Date;
  tag: any;
};

interface AiAnalysisResult {
  description: string;
  emotions: string;
}

const UserImagesWithAi = () => {
  const [images, setImages] = useState<Image[]>([]);
  const { userId } = useContext(UserContext);
  const [loadingImageId, setLoadingImageId] = useState<number>();
  const [results, setResults] = useState<{ [key: string]: AiAnalysisResult }>(
    {}
  );
  const [emotions, setEmotions] = useState<string[]>([]);
  const splitEmotion = (emotions: string) => {
    setEmotions(emotions.split(","));
  };
  const api = import.meta.env.VITE_API_URL_LOCAL;
  useEffect(() => {
    console.log(userId, api);

    const fetchImages = async () => {
      try {
        const response = await axios.get(`${api}/image/user/${userId}`);
        setImages(
          Array.isArray(response.data)
            ? response.data
            : response.data.images || []
        );
      } catch (error) {
        console.error("שגיאה בטעינת התמונות:", error);
      }
    };

    fetchImages();
  }, [userId]);

  const analyzeImage = async (image: Image) => {
    setLoadingImageId(image.id);
    try {
      const response = await axios.post(
        `${api}/Ai/analyze-description`,
        image.description
      );
      setResults((prev) => ({ ...prev, [image.id]: response.data }));
      setEmotions(response.data.emotion);
    } catch (error) {
      console.error("שגיאה בניתוח AI:", error);
    }
    setLoadingImageId(undefined);
  };

  return (
    <div className="grid gap- p-4">
      {images &&
        images.map((image) => (
          <div key={image.id} className="border p-4 rounded shadow">
            <img
              src={image.imgUrl}
              alt={`תמונה ${image.id}`}
              className="w-full max-w-xs rounded"
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => analyzeImage(image)}
              disabled={loadingImageId === image.id}
            >
              {loadingImageId === image.id ? "טוען..." : "הפעל ניתוח AI"}
            </button>
            {results[image.id] && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <strong>תיאור:</strong>
                <p>{results[image.id].description}</p>
                <strong>רגשות:</strong>
                <ul>
                  {emotions.map((emotion, idx) => (
                    <li key={idx}>{emotion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default UserImagesWithAi;
