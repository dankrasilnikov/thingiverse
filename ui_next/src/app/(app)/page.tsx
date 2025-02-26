"use client";

import { useRef } from "react";
// Важно: убедитесь, что convertStlToGltf совместим с браузером
import { convertStlToGltf } from "@/helpers/stlToGltfConverter";

export default function Home() {
    const stlInput = useRef<HTMLInputElement | null>(null);
    const imageInput = useRef<HTMLInputElement | null>(null);

    // Делайте send() асинхронной, т.к. будет await
    const send = async () => {
        const formData = new FormData();

        // Добавляем текстовые данные
        formData.append("author", "John Doe");
        formData.append("description", "Description");
        formData.append("title", "Title");
        formData.append("tags", JSON.stringify(["tag1", "tag2"]));

        // Обрабатываем STL
        if (stlInput.current?.files) {
            for (const file of stlInput.current.files) {
                // 1) Добавляем исходный STL в formData (поле "stls")
                formData.append("stls", file);

                // 2) Считываем файл как ArrayBuffer, конвертируем
                const arrayBuffer = await file.arrayBuffer(); // метод браузера
                const stlBuffer = new Uint8Array(arrayBuffer);

                // 3) Вызываем convertStlToGltf
                const gltfBuffer = await convertStlToGltf(stlBuffer);
                // gltfBuffer - это Node.js Buffer или Uint8Array.
                // Для FormData нужно Blob:
                const gltfBlob = new Blob([gltfBuffer], { type: "model/gltf-binary" });
                // Добавим glTF, например, как "gltfs"
                // Переименуем файл, чтобы отличать
                formData.append("gltfs", gltfBlob, file.name + ".gltf");
            }
        }

        // Обрабатываем изображения
        if (imageInput.current?.files) {
            for (const file of imageInput.current.files) {
                formData.append("images", file);
            }
        }

        // Теперь отправляем всё на сервер
        try {
            const response = await fetch("http://localhost:3000/api/v1/things", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log("Ответ API:", data);
        } catch (error) {
            console.error("Ошибка запроса:", error);
        }
    };

    return (
        <div>
            <input type="file" ref={stlInput} id="stlFiles" multiple />
            <input type="file" ref={imageInput} id="imageFiles" multiple />
            <button onClick={send}>send to backend</button>
        </div>
    );
}
