"use client";

import { useActionState, useEffect, useState } from "react";
import { Dices, Eye, EyeOff, Pencil, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PasswordEntry } from "@/types/password";
import { CreatePasswordState, editPassword } from "@/app/protected/actions/passwords";

type Props = {
  entry: PasswordEntry;
  onClose: () => void;
};
const initialState: CreatePasswordState = {
  success: false,
};
export function EditPasswordDialog({ entry, onClose }: Props) {
  // Estado solo visual (mostrar / ocultar la contraseña del formulario).
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    editPassword,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Pencil aria-hidden="true" className="size-5" />
          </span>
          <DialogTitle className="text-base">
            Editar contraseña de {entry.site}
          </DialogTitle>
          <DialogDescription>
            Modifica los campos que necesites. Nada se guarda todavía.
          </DialogDescription>
        </DialogHeader>

        {/* TODO(practica): convierte este <form> visual en tu formulario real
            (server action o API route para actualizar la contraseña). */}
        <form className="grid gap-4" action={formAction}>
          <Input type="hidden" name="id" value={entry.id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor={`edit-site-${entry.id}`}>site</Label>
              <Input
                id={`edit-site-${entry.id}`}
                name="site"
                defaultValue={entry.site}
                autoComplete="off"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor={`edit-username-${entry.id}`}>Usuario</Label>
              <Input
                id={`edit-username-${entry.id}`}
                name="username"
                defaultValue={entry.username}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-email-${entry.id}`}>Correo</Label>
            <Input
              id={`edit-email-${entry.id}`}
              name="email"
              type="email"
              defaultValue={entry.email}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-contrasena-${entry.id}`}>Contraseña</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id={`edit-password-${entry.id}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={entry.password}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-1 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </Button>
              </div>
              {/* TODO(practica): aquí va tu generador de contraseñas. */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                title="Generar contraseña segura"
              >
                <Dices aria-hidden="true" />
                <span className="sr-only">Generar contraseña segura</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-link-${entry.id}`}>Link</Label>
            <Input
              id={`edit-link-${entry.id}`}
              name="link"
              type="url"
              defaultValue={entry.link || ""}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-comments-${entry.id}`}>Comentario</Label>
            <Textarea
              id={`edit-comments-${entry.id}`}
              name="comments"
              defaultValue={entry.comments || ""}
              rows={3}
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              }
            />
            <Button type="submit" disabled={isPending}>
              <Save aria-hidden="true" />
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
