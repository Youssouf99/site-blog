import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { IconButton, Textarea } from "@material-tailwind/react";
import React from "react";

const TwitterChatboxTextarea = ({ value, onChange, onSubmit }) => {
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
      <Textarea
        rows={1}
        resize={true}
        placeholder="Écrivez votre commentaire ici..."
        className="min-h-full !border-0 focus:border-transparent "
        containerProps={{
          className: "grid h-full",
        }}
        value={value}
        onChange={onChange}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div>
        <IconButton variant="text" className="rounded-full" onClick={onSubmit}>
          <PaperAirplaneIcon className="h-5 w-5" />
        </IconButton>
      </div>
    </div>
  );
};

export default TwitterChatboxTextarea;
