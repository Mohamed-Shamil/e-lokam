import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, BarChart3, Users } from 'lucide-react';
import { Progress } from './ui/progress';

interface PollOption {
  id: string;
  text: string;
  textMl: string;
  votes: number;
  percentage: number;
}

interface Poll {
  id: string;
  question: string;
  questionMl: string;
  options: PollOption[];
  totalVotes: number;
  endDate?: Date;
  hasVoted?: boolean;
  userVote?: string;
}

interface PollCardProps {
  poll: Poll;
  onVote?: (pollId: string, optionId: string) => void;
}

export function PollCard({ poll, onVote }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(poll.userVote || null);
  const [hasVoted, setHasVoted] = useState(poll.hasVoted || false);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    if (onVote) {
      onVote(poll.id, optionId);
    }
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/50">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
            Poll / പോൾ
          </Badge>
        </div>

        <h3 className="font-semibold text-base md:text-lg mb-1">{poll.question}</h3>
        <p className="text-sm text-muted-foreground mb-4">{poll.questionMl}</p>

        <div className="space-y-3 mb-4">
          {poll.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isUserVote = hasVoted && isSelected;

            return (
              <div
                key={option.id}
                className={`relative rounded-lg border-2 p-3 cursor-pointer transition-all ${
                  hasVoted
                    ? isSelected
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 bg-white'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => !hasVoted && handleVote(option.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      hasVoted
                        ? isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm md:text-base font-medium flex-1">
                      {option.text}
                    </span>
                    {isUserVote && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    )}
                  </div>
                  {hasVoted && (
                    <span className="text-sm font-semibold text-blue-600 ml-2">
                      {option.percentage}%
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground ml-6 mb-2">{option.textMl}</p>

                {hasVoted && (
                  <div className="ml-6">
                    <Progress value={option.percentage} className="h-2 bg-gray-200" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.votes} votes / {option.votes} വോട്ടുകൾ
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{poll.totalVotes} {hasVoted ? 'total votes' : 'votes so far'} / മൊത്തം വോട്ടുകൾ</span>
          </div>
          {!hasVoted && (
            <Button
              size="sm"
              onClick={() => selectedOption && handleVote(selectedOption)}
              disabled={!selectedOption}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Vote / വോട്ട് സമർപ്പിക്കുക
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

