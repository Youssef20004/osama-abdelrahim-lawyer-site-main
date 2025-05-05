
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatDialog } from "./ChatDialog";

export const ChatButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 rounded-full h-14 w-14 shadow-lg flex items-center justify-center p-0 z-50"
        aria-label="افتح المحادثة"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <ChatDialog open={open} setOpen={setOpen} />
    </>
  );
};
