
import { useState, useRef, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    text: "مرحبا بك في مكتب الأستاذ أسامة عبدالرحيم للمحاماة، كيف يمكنني مساعدتك؟",
    isUser: false,
    timestamp: new Date(),
  },
];

interface ChatDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ChatDialog = ({ open, setOpen }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulate sending message to backend
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate response after delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: `response-${Date.now()}`,
        text: getAutoResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple auto-response system
  const getAutoResponse = (input: string): string => {
    const normalizedInput = input.toLowerCase();
    
    if (normalizedInput.includes("استشارة") || normalizedInput.includes("مشورة")) {
      return "يمكنك حجز استشارة قانونية من خلال الضغط على زر 'طلب استشارة' في أعلى الصفحة، وسيتم التواصل معك في أقرب وقت ممكن.";
    } else if (normalizedInput.includes("سعر") || normalizedInput.includes("تكلفة") || normalizedInput.includes("اسعار")) {
      return "تختلف الأسعار حسب نوع القضية وتعقيدها. يمكنك التواصل معنا لتحديد موعد للحصول على تقييم مجاني لحالتك.";
    } else if (normalizedInput.includes("عنوان") || normalizedInput.includes("مكان") || normalizedInput.includes("موقع")) {
      return "يمكنك العثور على عنوان مكتبنا في قسم 'عن المكتب'. نرحب بزيارتك خلال ساعات العمل من 9 صباحًا حتى 5 مساءً من الأحد إلى الخميس.";
    } else if (normalizedInput.includes("شكر") || normalizedInput.includes("ممتاز") || normalizedInput.includes("رائع") || normalizedInput.includes("شكرا")) {
      return "شكرًا لك، نحن سعداء بخدمتك دائمًا!";
    } else {
      return "شكرًا على تواصلك معنا. سيقوم أحد محامينا بالرد عليك قريبًا. يمكنك أيضًا الاتصال بنا مباشرة على الرقم 01206281444.";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-center">المحادثة الفورية</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg flex items-center">
                <Loader className="h-4 w-4 animate-spin ml-2" />
                <span>جاري الكتابة...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="resize-none min-h-[80px]"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="shrink-0"
              type="submit"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
