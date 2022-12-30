import { useState } from 'react'
import { insertPrompt } from '../lib/db';
export default function CreateForm() {
    const [textPrompt, setTextPrompt] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
            {!isSubmitting && (
            <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    What would you like to see?
                </label>
                <div className="mt-3 mb-5">
                    <textarea
                        onChange={(e) => setTextPrompt(e.target.value)}
                        value={textPrompt}
                        rows={4}
                        name="comment"
                        id="comment"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md border-2 p-2"
                        defaultValue={''}
                        placeholder="Type here..."
                    />
                </div>
                <button onClick={
                    () => {
                        insertPrompt({
                            text: textPrompt,
                        })
                        setIsSubmitting(true);

                        setTextPrompt('');
                    }
                }
                disabled={textPrompt.length < 10}
                className={
                    textPrompt.length < 10
                        ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed w-full'
                    : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                }
                >
                    Generate
                </button>
                <p className="mt-2 text-sm text-gray-500">
                    Please explain what you'd like to see in detail. <br/>For example, "A monkey sitting on top of a train eating a banana"
                </p>
            </div>
            )}
            {isSubmitting && (
                <div>
                    <p className="text-2xl">Check on the TinkerSpace TV!</p>
                    <p className="mt-2 text-sm text-gray-500">
                        After your image is generated, it will be shown on the TinkerSpace TV.
                    </p>
                    <p className="mt-10 text-sm text-gray-500">
                        Scan QR again or refresh this page to try again.
                    </p>
                </div>
            )}
        </div>
    )
}
