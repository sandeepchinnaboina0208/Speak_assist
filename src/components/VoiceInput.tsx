import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onListeningChange: (listening: boolean) => void;
  disabled?: boolean;
}

export const VoiceInput = ({ onTranscript, onListeningChange, disabled }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      onListeningChange(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptResult = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptResult;
        } else {
          interimTranscript += transcriptResult;
        }
      }

      setTranscript(interimTranscript || finalTranscript);
      
      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      onListeningChange(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      onListeningChange(false);
      setTranscript('');
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <MicOff className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm">
          Voice input is not supported in your browser.
          <br />
          Try using Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-foreground">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Start Speaking to Shop</h2>
      </div>
      
      <p className="text-muted-foreground text-sm text-center max-w-md">
        Say: "Find laptop", "Show phones under 50000", "Add iPhone to cart"
      </p>
      
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        className={cn(
          "relative w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isListening 
            ? "bg-primary voice-pulse" 
            : "bg-primary hover:bg-primary/90 hover:scale-105",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Mic className={cn(
          "h-8 w-8 text-primary-foreground transition-transform",
          isListening && "scale-110"
        )} />
      </button>
      
      <p className="text-sm text-muted-foreground">
        {isListening ? 'Listening...' : 'Click to speak'}
      </p>
      
      {transcript && (
        <div className="w-full max-w-md p-3 bg-muted rounded-lg fade-in">
          <p className="text-sm text-muted-foreground">Hearing:</p>
          <p className="font-medium">{transcript}</p>
        </div>
      )}
    </div>
  );
};
