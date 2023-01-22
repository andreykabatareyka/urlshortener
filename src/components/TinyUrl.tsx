import React, { useState } from 'react'
import axios from 'axios'
import { RiFileCopyFill, RiFileCopyLine } from 'react-icons/Ri'

const TinyURL: React.FC = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const tinyRes = await axios.get(
        `http://tinyurl.com/api-create.php?url=${longUrl}`
      )
      setShortUrl(tinyRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <div className="text-grey   p-4">
      <form onSubmit={handleSubmit} className=" mb-4  flex justify-center  ">
        <input
          className="w-96 justify-center rounded-lg  border-2  border-gray-500  p-2 text-gray-800"
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={handleChange}
        />
        <button
          className="ml-2 w-20 rounded-lg border-2 border-gray-500 bg-white text-gray-800"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : 'Shorten'}
        </button>
      </form>
      {shortUrl && (
        <div className="flex justify-center">
          <a href={shortUrl} className=" mt-1 text-white">
            {shortUrl}
          </a>
          <button
            onClick={handleCopyClick}
            className=" ml-5 w-8  rounded-lg border-2  border-white p-1.5  text-white"
            title="Copy to clipboard"
          >
            {isCopied ? <RiFileCopyFill /> : <RiFileCopyLine />}
          </button>
        </div>
      )}
    </div>
  )
}

export default TinyURL
