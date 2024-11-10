import { Phones } from "./Phones";
import Modal from "../../../../components/modals/Modal";
import { Button } from "../../../../components/ui/Button";
import { useState } from "react";
import CloseIcon from "../../../../assets/icons/CloseIcon";
import IconButton from "../../../../components/ui/IconButton";
import { useAddPhone } from "../../../../store/admin/useAddPhone";
import { useNavigate } from "react-router-dom";

export default function CategorySelection({ category }: { category: string }) {
  const [open, setOpen] = useState(false);
  const { reset } = useAddPhone();
  const navigate = useNavigate();

  const handleYes = () => {
    switch (category) {
      case "phones":
        reset();
        break;
    }
    setOpen(false);
  };
  return (
    <div className="w-full">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex  gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Add {category}</h1>
          <IconButton
            onClick={() => setOpen(false)}
            className="bg-transparent text-black hover:bg-transparent focus:bg-transparent"
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <p className="text-lg font-medium">
            Do you want to add another {category}?
          </p>
          <div className="flex gap-4 justify-end">
            <Button onClick={handleYes}>Yes</Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/dashboard")}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      {category === "phones" && <Phones setOpen={setOpen} />}
    </div>
  );
}
