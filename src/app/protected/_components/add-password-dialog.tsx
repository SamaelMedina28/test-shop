"use client";

import { useState } from "react";
import { Dices, Eye, EyeOff, KeyRound, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AddPasswordDialog() {
  // Estado solo visual (mostrar / ocultar la contraseña del formulario).
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            <Plus aria-hidden="true" />
            Agregar contraseña
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <KeyRound aria-hidden="true" className="size-5" />
          </span>
          <DialogTitle className="text-base">
            Agregar nueva contraseña
          </DialogTitle>
          <DialogDescription>
            Completa los datos del sitio. Nada se guarda todavía.
          </DialogDescription>
        </DialogHeader>

        {/* TODO(practica): convierte este <form> visual en tu formulario real
            (server action o API route para crear la contraseña). */}
        <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="new-sitio">Sitio</Label>
              <Input
                id="new-sitio"
                name="sitio"
                placeholder="Ej. GitHub"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-usuario">Usuario</Label>
              <Input
                id="new-usuario"
                name="usuario"
                placeholder="Ej. samael-dev"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-correo">Correo</Label>
            <Input
              id="new-correo"
              name="correo"
              type="email"
              placeholder="Ej. samael@correo.com"
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-contrasena">Contraseña</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="new-contrasena"
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
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
            {/* Medidor visual de fuerza (decorativo). */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1 flex-1 rounded-full bg-primary" />
              <span className="h-1 flex-1 rounded-full bg-primary" />
              <span className="h-1 flex-1 rounded-full bg-primary/40" />
              <span className="h-1 flex-1 rounded-full bg-muted" />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-link">Link</Label>
            <Input
              id="new-link"
              name="link"
              type="url"
              placeholder="https://…"
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-comentario">Comentario</Label>
            <Textarea
              id="new-comentario"
              name="comentario"
              placeholder="Notas sobre esta cuenta…"
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
              <Plus aria-hidden="true" />
              Guardar contraseña
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
