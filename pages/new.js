import { useState } from 'react'
import { insertPrompt } from '../lib/db';
export default function CreateForm() {
    const [textPrompt, setTextPrompt] = useState('');
    return (
        <div className="container p-4 flex items-start space-x-4">
            <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Text Prompt
                </label>
                <div className="mt-1">
                    <textarea
                        onChange={(e) => setTextPrompt(e.target.value)}
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={''}
                    />
                </div>
                <button onClick={
                    () => {
                        insertPrompt({
                            text: textPrompt,
                        })
                    }
                } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>

    )
}
