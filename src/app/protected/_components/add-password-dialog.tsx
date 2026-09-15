"use client";

import { useActionState, useEffect, useState } from "react";

import {
  Dices,
  Eye,
  EyeOff,
  KeyRound,
  Plus,
} from "lucide-react";

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

import {
  createPassword,
  type CreatePasswordState,
} from "../actions/passwords";

const initialState: CreatePasswordState = {
  success: false,
};

export function AddPasswordDialog() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    createPassword,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <KeyRound
              aria-hidden="true"
              className="size-5"
            />
          </span>

          <DialogTitle className="text-base">
            Agregar nueva contraseña
          </DialogTitle>

          <DialogDescription>
            Completa los datos del sitio.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          action={formAction}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="new-site">
                Sitio
              </Label>

              <Input
                id="new-site"
                name="site"
                placeholder="Ej. GitHub"
                autoComplete="off"
              />

              {state.errors?.site && (
                <p className="text-sm text-destructive">
                  {state.errors.site[0]}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="new-username">
                Usuario
              </Label>

              <Input
                id="new-username"
                name="username"
                placeholder="Ej. samael-dev"
                autoComplete="off"
              />

              {state.errors?.username && (
                <p className="text-sm text-destructive">
                  {state.errors.username[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-email">
              Correo
            </Label>

            <Input
              id="new-email"
              name="email"
              type="email"
              placeholder="Ej. samael@correo.com"
              autoComplete="off"
            />

            {state.errors?.email && (
              <p className="text-sm text-destructive">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-password">
              Contraseña
            </Label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="new-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  className="pr-10"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="absolute top-1/2 right-1 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                title="Generar contraseña segura"
              >
                <Dices aria-hidden="true" />
                <span className="sr-only">
                  Generar contraseña segura
                </span>
              </Button>
            </div>

            {state.errors?.password && (
              <p className="text-sm text-destructive">
                {state.errors.password[0]}
              </p>
            )}

            <div
              className="flex items-center gap-1.5"
              aria-hidden="true"
            >
              <span className="h-1 flex-1 rounded-full bg-primary" />
              <span className="h-1 flex-1 rounded-full bg-primary" />
              <span className="h-1 flex-1 rounded-full bg-primary/40" />
              <span className="h-1 flex-1 rounded-full bg-muted" />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-link">
              Link
            </Label>

            <Input
              id="new-link"
              name="link"
              type="url"
              placeholder="https://..."
              autoComplete="off"
            />

            {state.errors?.link && (
              <p className="text-sm text-destructive">
                {state.errors.link[0]}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-comments">
              Comentario
            </Label>

            <Textarea
              id="new-comments"
              name="comments"
              placeholder="Notas sobre esta cuenta..."
              rows={3}
            />

            {state.errors?.comments && (
              <p className="text-sm text-destructive">
                {state.errors.comments[0]}
              </p>
            )}
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-destructive">
              {state.message}
            </p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                >
                  Cancelar
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={isPending}
            >
              <Plus aria-hidden="true" />

              {isPending
                ? "Guardando..."
                : "Guardar contraseña"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}