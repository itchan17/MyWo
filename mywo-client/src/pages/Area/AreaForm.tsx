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
import type { AreaForm } from "@/types/AreaTypes/area.types";
import { useAreaStore } from "@/stores/areaStore";
import { useNavigate } from "react-router-dom";

interface AreaFormProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

type ValidationErrors = {
  [key: string]: string[];
};

export default function AreaForm({ open, onOpenChange }: AreaFormProps) {
  const navigate = useNavigate();

  // Area store
  const addArea = useAreaStore((state) => state.addArea);

  const [areaForm, setAreaForm] = useState<AreaForm>({
    name: "",
    description: "",
    icon: "",
    color: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setErrors({});
    setAreaForm({
      name: "",
      description: "",
      icon: "",
      color: "",
    });
  };

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
    setErrors({});
    setIsLoading(true);
    try {
      const response = await api.post("/areas", areaForm);
      const area = response.data.data;

      addArea(area);
      resetForm();
      onOpenChange(false);

      navigate(`/areas/${area.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (responseData.status === 400 && responseData?.errors) {
          setErrors(responseData.errors);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add Area</DialogTitle>
          <DialogDescription>
            Create a new area to organize your projects and keep your workspace
            structured.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label>
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              value={areaForm.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className={
                errors?.Name ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            {/* Name errors */}
            {errors?.Name?.map((error) => (
              <span className="text-red-500 text-xs" key={error}>
                {error}
              </span>
            ))}
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea
              value={areaForm.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              className={`${
                errors?.Description
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              } h-32 overflow-y-auto`}
            ></Textarea>
            {/* Description errors */}
            {errors?.Description?.map((error) => (
              <span className="text-red-500 text-xs" key={error}>
                {error}
              </span>
            ))}
          </Field>
          <Field>
            <Label>Icon</Label>
            <IconPicker
              value={areaForm.icon}
              onChange={(icon) => handleFormChange("icon", icon)}
              hasError={errors?.Name ? true : false}
            />
            {/* Icon errors */}
            {errors?.Icon?.map((error) => (
              <span className="text-red-500 text-xs" key={error}>
                {error}
              </span>
            ))}
          </Field>
          <Field>
            <Label>Color</Label>
            <ColorPicker
              value={areaForm.color}
              onChange={(color) => handleFormChange("color", color)}
            />
            {/* Color errors */}
            {errors?.Color?.map((error) => (
              <span className="text-red-500 text-xs" key={error}>
                {error}
              </span>
            ))}
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant={"outline"}>Cancel</Button>} />
          <Button type="button" onClick={submit}>
            {isLoading ? <Spinner /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}
