export interface SubmitButtonProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  hasErrors: boolean;
}
