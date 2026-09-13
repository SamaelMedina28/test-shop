"use client";

import { useState } from "react";
import { Dices, Eye, EyeOff, Pencil, Save } from "lucide-react";

import type { PasswordEntry } from "@/lib/passwords-mock";
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

type Props = {
  entry: PasswordEntry;
  onClose: () => void;
};

export function EditPasswordDialog({ entry, onClose }: Props) {
  // Estado solo visual (mostrar / ocultar la contraseña del formulario).
  const [showPassword, setShowPassword] = useState(false);

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
            Editar contraseña de {entry.sitio}
          </DialogTitle>
          <DialogDescription>
            Modifica los campos que necesites. Nada se guarda todavía.
          </DialogDescription>
        </DialogHeader>

        {/* TODO(practica): convierte este <form> visual en tu formulario real
            (server action o API route para actualizar la contraseña). */}
        <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor={`edit-sitio-${entry.id}`}>Sitio</Label>
              <Input
                id={`edit-sitio-${entry.id}`}
                name="sitio"
                defaultValue={entry.sitio}
                autoComplete="off"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor={`edit-usuario-${entry.id}`}>Usuario</Label>
              <Input
                id={`edit-usuario-${entry.id}`}
                name="usuario"
                defaultValue={entry.usuario}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-correo-${entry.id}`}>Correo</Label>
            <Input
              id={`edit-correo-${entry.id}`}
              name="correo"
              type="email"
              defaultValue={entry.correo}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-contrasena-${entry.id}`}>Contraseña</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id={`edit-contrasena-${entry.id}`}
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  defaultValue={entry.contrasena}
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
              defaultValue={entry.link}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor={`edit-comentario-${entry.id}`}>Comentario</Label>
            <Textarea
              id={`edit-comentario-${entry.id}`}
              name="comentario"
              defaultValue={entry.comentario}
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
            {/* TODO(practica): onClick / action para guardar en tu back. */}
            <Button type="button">
              <Save aria-hidden="true" />
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
