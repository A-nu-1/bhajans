"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Bhajan, Paragraph, Category } from "@/types/bhajans";

export default function EditBhajanForm({
  bhajan,
  categories,
}: {
  bhajan: Bhajan;
  categories: Category[];
}) {
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(
      bhajan.categories.map((c) => c.id)
    );

  const [title, setTitle] = useState(bhajan.title);
  const [titleEnglish, setTitleEnglish] = useState(bhajan.titleEnglish || "");
  const [language, setLanguage] = useState(bhajan.language);
  const [mainText, setMainText] = useState(bhajan.mainText);
  const [description, setDescription] = useState(bhajan.description || "");
  const [mediaUrl, setMediaUrl] = useState(bhajan.mediaUrl || "");

  const [paragraphs, setParagraphs] = useState(
    bhajan.paragraphs.map((p: Paragraph) => p.text)
  );

  // add paragraph
  const addParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  // update paragraph
  const updateParagraph = (value: string, index: number) => {
    const copy = [...paragraphs];
    copy[index] = value;
    setParagraphs(copy);
  };

  // delete paragraph
  const deleteParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };
  function toggleCategory(categoryId: string) {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`/api/bhajans/${bhajan.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        titleEnglish,
        language,
        mainText,
        description,
        mediaUrl,
        paragraphs,
        categoryIds: selectedCategories,
      }),
    });

    if (res.ok) {
      router.push(`/admin/bhajans/${bhajan.id}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Edit Bhajan</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                placeholder="English Title"
                value={titleEnglish}
                onChange={(e) => setTitleEnglish(e.target.value)}
              />
            </div>

            <Input
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />

            <Separator />

            <Textarea
              placeholder="Main Text (Pallavi)"
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
              className="min-h-[120px]"
            />

            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />

            <Input
              placeholder="Media URL (YouTube / Audio)"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>
                  Paragraphs
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                {paragraphs.map((p, i) => (
                  <div
                    key={i}
                    className="space-y-2"
                  >
                    <Textarea
                      value={p}
                      onChange={(e) =>
                        updateParagraph(

                          e.target.value, i
                        )
                      }
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        deleteParagraph(i)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={addParagraph}
                >
                  + Add Paragraph
                </Button>
                <input
                  type="hidden"
                  name="paragraphs"
                  value={JSON.stringify(paragraphs)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Categories
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-2">

                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex gap-2 items-center"
                    >
                      <Input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                      />

                      {cat.name}
                    </label>
                  ))}

                </div>
              </CardContent>
            </Card>
            <Separator />

            <Button type="submit" className="w-full">
              Save Changes
            </Button>

            <input
              type="hidden"
              name="id"
              value={bhajan.id}
            />

          </form>
        </CardContent>
      </Card>

    </div>
  );
}
