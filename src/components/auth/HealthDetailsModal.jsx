import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext.jsx';
import { useToast } from '@/components/ui/use-toast';
import { Activity } from 'lucide-react';

const HealthDetailsModal = ({ isOpen, onOpenChange }) => {
  const [healthIssues, setHealthIssues] = useState('');
  const { updateUserHealthDetails, skipHealthDetails } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!healthIssues.trim()) {
      toast({
        title: "No details provided",
        description: "If you have health issues to share, please describe them.",
        variant: "destructive",
      });
      return;
    }
    updateUserHealthDetails(healthIssues);
    toast({
      title: "Health Details Saved!",
      description: "Your health information has been updated.",
      className: "bg-green-500 text-white",
    });
    onOpenChange(false);
  };

  const handleSkip = () => {
    skipHealthDetails();
    toast({
      title: "Noted!",
      description: "You can update your health details later if you wish.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-slate-800 dark:to-indigo-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">Your Health Snapshot</DialogTitle>
          <DialogDescription className="text-center text-slate-600 dark:text-slate-300">
            Optionally, tell us about any current health issues or concerns you have. This can help us personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="health-issues" className="text-left flex items-center text-slate-700 dark:text-slate-200">
                <Activity className="mr-2 h-5 w-5 text-primary" /> Current Health Issues/Concerns
              </Label>
              <Textarea
                id="health-issues"
                value={healthIssues}
                onChange={(e) => setHealthIssues(e.target.value)}
                placeholder="e.g., Frequent headaches, seasonal allergies, managing diabetes..."
                className="w-full min-h-[120px] bg-white/70 dark:bg-slate-700/70 border-slate-300 dark:border-slate-600 focus:border-primary"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSkip}
              className="w-full sm:w-auto border-slate-400 hover:bg-slate-100 dark:border-slate-500 dark:hover:bg-slate-700"
            >
              Skip For Now
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Save Health Details
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HealthDetailsModal;