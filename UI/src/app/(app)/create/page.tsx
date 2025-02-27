'use client'

import { useRef, useState } from 'react'

export default function Home() {
  const stlInput = useRef<HTMLInputElement | null>(null)
  const imageInput = useRef<HTMLInputElement | null>(null)

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const send = async () => {
    const formData = new FormData()

    formData.append('author', author)
    formData.append('description', description)
    formData.append('title', title)
    formData.append('tags', JSON.stringify(['tag1', 'tag2']))

    if (stlInput.current?.files) {
      for (const file of stlInput.current.files) {
        formData.append('stls', file)
      }
    }

    if (imageInput.current?.files) {
      for (const file of imageInput.current.files) {
        formData.append('images', file)
      }
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/things', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log('Ответ API:', data)
    } catch (error) {
      console.error('Ошибка запроса:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id='title'
        name='title'
      />
      <label htmlFor='description'>Description</label>
      <input
        type='text'
        value={author}
        onChange={(e) => setDescription(e.target.value)}
        id='description'
        name='description'
      />
      <label htmlFor='author'>Author</label>
      <input
        type='text'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        id='author'
        name='author'
      />
      <label htmlFor='stlFiles'>Files</label>
      <input
        type='file'
        accept='.stl'
        ref={stlInput}
        id='stlFiles'
        name='stlFiles'
        multiple
      />
      <label htmlFor='imageFiles'>Images</label>
      <input
        type='file'
        accept='image/png, image/jpeg'
        ref={imageInput}
        id='imageFiles'
        name='imageFiles'
        multiple
      />
      <button onClick={send}>Send to backend</button>
    </div>
  )
}
