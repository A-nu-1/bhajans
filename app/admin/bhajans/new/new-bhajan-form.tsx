"use client";

import { useState } from "react";
import { createBhajan } from "../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type Category = {
    id: string;
    name: string;
};

export default function NewBhajanForm({
    categories,
}: {
    categories: Category[];
}) {


    const [paragraphs, setParagraphs] = useState<string[]>([""]);

    const addParagraph = () => setParagraphs([...paragraphs, ""]);

    const updateParagraph = (i: number, value: string) => {
        const copy = [...paragraphs];
        copy[i] = value;
        setParagraphs(copy);
    };

    const removeParagraph = (i: number) => {
        setParagraphs(paragraphs.filter((_, idx) => idx !== i));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Create Bhajan</h1>

 

            <form action={createBhajan} className="space-y-4">

               

                <Input name="title" placeholder="Title (Kannada)" />
                <Input name="titleEnglish" placeholder="Title (English)" />
                <Input name="language" placeholder="Language" />

                <Textarea name="mainText" placeholder="Main Text" />

                <Input name="mediaUrl" placeholder="YouTube / Audio URL" />

                <Textarea name="description" placeholder="Description" />

                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        name="categories"
                                        value={cat.id}
                                    />

                                    <span>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Paragraphs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Paragraphs</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {paragraphs.map((p, i) => (
                            <div key={i} className="space-y-2">
                                <Textarea
                                    value={p}
                                    onChange={(e) => updateParagraph(i, e.target.value)}
                                    placeholder={`Paragraph ${i + 1}`}
                                />

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeParagraph(i)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}

                        <Button type="button" onClick={addParagraph}>
                            + Add Paragraph
                        </Button>
                    </CardContent>
                </Card>
                {/* Hidden field for paragraphs */}
                <input
                    type="hidden"
                    name="paragraphs"
                    value={JSON.stringify(paragraphs)}
                />

                <Button type="submit" className="w-full">
                    Save Bhajan
                </Button>
            </form>
        </div>
    );
}