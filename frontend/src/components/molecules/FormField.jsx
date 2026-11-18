import Input from "../atoms/Input";
import Label from "../atoms/Label";
import "./Molecules.css";

export default function FormField({ label, error, id, ...inputProps }) {
  return (
    <div className="form-field">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} aria-invalid={Boolean(error)} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
