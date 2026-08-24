import { useState, useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconPicker } from "@/components/IconPicker";
import { ColorPicker } from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

interface AreaForm {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export default function AreaForm() {
  const [areaForm, setAreaForm] = useState<AreaForm>({
    name: "",
    description: "",
    icon: "",
    color: "",
  });

  const handleFormChange = <K extends keyof AreaForm>(
    name: K,
    value: AreaForm[K],
  ) => {
    setAreaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      const response = await api.post("/areas", areaForm);

      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // error is now typed as AxiosError
        console.log(error.response?.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  return (
    <form>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add Area</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label>Name</Label>
            <Input
              value={areaForm.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            ></Input>
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea
              value={areaForm.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
            ></Textarea>
          </Field>
          <Field>
            <Label>Icon</Label>
            <IconPicker
              value={areaForm.icon}
              onChange={(icon) => handleFormChange("icon", icon)}
            />
          </Field>
          <Field>
            <Label>Color</Label>
            <ColorPicker
              value={areaForm.color}
              onChange={(color) => handleFormChange("color", color)}
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant={"secondary"}>Cancel</Button>} />
          <Button type="button" onClick={submit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}
