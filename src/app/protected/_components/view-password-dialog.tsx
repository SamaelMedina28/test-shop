"use client";

import { useState } from "react";
import { Copy, ExternalLink, Eye, EyeOff, Pencil } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { PasswordEntry } from "@/types/password";

type Props = {
  entry: PasswordEntry;
  onClose: () => void;
  onEdit: (entry: PasswordEntry) => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export function ViewPasswordDialog({ entry, onClose, onEdit }: Props) {
  // Estado solo visual (mostrar / ocultar la contraseña).
  const [visible, setVisible] = useState(false);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
              {entry.site.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <DialogTitle className="truncate text-base">
                {entry.site}
              </DialogTitle>
              <DialogDescription className="truncate">
                Detalle de la contraseña guardada.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Usuario">
            <p className="font-medium break-all">{entry.username}</p>
          </Field>
          <Field label="Correo">
            <p className="font-medium break-all">{entry.email}</p>
          </Field>
        </div>

        <Field label="Contraseña">
          <div className="flex items-center gap-1.5 rounded-none border border-input bg-muted/40 px-2.5 py-1.5">
            <code className="flex-1 text-xs tracking-wider break-all">
              {visible ? entry.password : "••••••••••••"}
            </code>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? (
                <EyeOff aria-hidden="true" />
              ) : (
                <Eye aria-hidden="true" />
              )}
            </Button>
            {/* TODO(practica): copiar al portapapeles. */}
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Copiar contraseña"
              title="Copiar (pendiente)"
            >
              <Copy aria-hidden="true" />
            </Button>
          </div>
        </Field>

        <Field label="Link">
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex max-w-full items-center gap-1.5 text-primary underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{entry.link}</span>
            </a>
          ) : (
            <p className="text-muted-foreground">—</p>
          )}
        </Field>

        <Field label="Comentario">
          <p className="leading-6 text-muted-foreground">
            {entry.comments || "—"}
          </p>
        </Field>

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            }
          />
          <Button type="button" onClick={() => onEdit(entry)}>
            <Pencil aria-hidden="true" />
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
