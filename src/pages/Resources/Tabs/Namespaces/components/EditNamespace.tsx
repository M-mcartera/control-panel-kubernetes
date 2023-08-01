import { useState } from "react";
import { Namespace } from "./NamespacesListing";
interface EditNamespaceProps {
  namespace: Namespace;
}
interface EditProps {
  key: string;
  value: string;
}
const EditNamespace = ({ namespace }: EditNamespaceProps) => {
  const [labels, setLabels] = useState<EditProps[]>([{ key: "", value: "" }]);
  const [annotations, setAnnotations] = useState<EditProps[]>([
    { key: "", value: "" },
  ]);

  const handleSubmit = () => {};
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h3>{namespace.name}</h3>
      <div>
        <h4>Labels</h4>
        {labels.map((label: EditProps, index: number) => {
          return (
            <>
              <input />
              <input />
            </>
          );
        })}
      </div>
    </form>
  );
};

export default EditNamespace;
