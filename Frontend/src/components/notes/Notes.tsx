import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NoteModal from "@/components/modals/note-modal";
import Heading from "@/components/ui/heading";
import ToolTipBox from "@/components/ui/tool-tip-box";
import { NoteContext } from "@/providers/note-provider";
import { Note } from "@/types";

import NoteItem from "./Noteitem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card } from "../ui/card";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, fetchNotes } = context;
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Note | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const openModal = (data: Note | null) => {
    setModalProps(data);
    setOpen(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    notes?.filter((item, i, arr) => {
      return arr.indexOf(item) === i;
    })
  );
  const uniqueCategories: string[] = [
    ...new Set(notes?.map((item) => item.category)),
  ];
  const filteredNotes = notes?.filter(
    (note) => note.category === selectedCategory || selectedCategory === null
  );
  return (
    <>
      <NoteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={modalProps}
      />

      <div className="container">
        <div className="flex items-center justify-between mt-10 mb-4">
          <Heading title="Notes" />
          <Button
            onClick={() => openModal(null)}
            size="sm"
            className="hidden sm:block"
          >
            Add a Note
          </Button>
          <ToolTipBox tip="Create a note">
            <Button
              onClick={() => openModal(null)}
              size="icon"
              className="rounded-full sm:hidden"
            >
              <Plus />
            </Button>
          </ToolTipBox>
        </div>
        <Separator />

        <div className="my-10">
          <div className="absolute w-full px-4 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {filteredNotes === null ? (
              <h5 className="text-lg font-medium">Loading...</h5>
            ) : (
              filteredNotes &&
              filteredNotes.length < 1 && (
                <>
                  <h4 className="mb-3 text-3xl font-bold">
                    Sorry You don't have any notes.
                  </h4>
                  <h5 className="text-lg font-medium">
                    Create a note, and it will appear here
                  </h5>
                </>
              )
            )}
          </div>
          <div className="flex flex-col gap-6">
            {uniqueCategories && (
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger className="">
                    <Card className="p-2 px-6"> Filter</Card>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-2 justify-center">
                    {uniqueCategories.length > 0 &&
                      uniqueCategories.map((note: string) => {
                        return (
                          <DropdownMenuItem
                            key={note}
                            className="flex items-center justify-start gap-2"
                            onClick={() => setSelectedCategory(note)}
                          >
                            {selectedCategory == note ? (
                              <IoMdCheckmark />
                            ) : null}
                            {note}
                          </DropdownMenuItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 grid-rows-[masonary] grid-flow-dense">
              {filteredNotes &&
                filteredNotes.map((note) => {
                  return (
                    <div key={note?._id}>
                      <NoteItem
                        note={note}
                        updateNote={() => openModal(note)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
