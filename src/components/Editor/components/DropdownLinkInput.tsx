import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { RefObject, useState } from "react";
import { type Editor } from "@tiptap/core";
import { preventBubbling } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import {
  ArrowTopRightIcon,
  CheckIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

interface DropdownLinkInputProps {
  editor: Editor;
  container: RefObject<HTMLDivElement>["current"];
}

const DropdownLinkInput: React.FC<DropdownLinkInputProps> = ({
  container,
  editor,
}) => {
  const [input, setInput] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpenChange = () => setIsOpen(!isOpen);

  const setLink = () => {
    editor.commands.setLink({ href: input, target: "_blank" });
    setInput("");
    setIsOpen(false);
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <button
            className="gap-2 shrink-0 hover:bg-accent border-none shadow-[none] ring-0 rounded-none py-1 px-2 flex items-center"
            type="button"
          >
            <ArrowTopRightIcon />
            Link
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" container={container}>
          <div
            onClick={preventBubbling}
            className="flex gap-2 w-full hover:bg-background"
          >
            <Input
              onChange={(e) => setInput(e.target.value)}
              value={editor.getAttributes("link").href ?? input}
              placeholder="Paste link"
              className="rounded-none focus-visible:ring-0 border-none bg-transparent"
            />
            {editor.isActive("link") ? (
              <button
                type="button"
                onClick={unsetLink}
                className="w-[36px] h-[36px] p-2 hover:bg-accent cursor-pointer border-l"
              >
                <Cross1Icon className="w-full h-full" />
              </button>
            ) : (
              <button
                type="button"
                className="w-[36px] h-[36px] p-2 hover:bg-accent cursor-pointer border-l"
                onClick={setLink}
              >
                <CheckIcon className="w-full h-full" />
              </button>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownLinkInput;
