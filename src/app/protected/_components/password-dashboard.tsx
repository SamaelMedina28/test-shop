"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileSpreadsheet,
  KeyRound,
  MoreHorizontal,
  Pencil,
  Search,
  SearchX,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddPasswordDialog } from "./add-password-dialog";
import { EditPasswordDialog } from "./edit-password-dialog";
import { ViewPasswordDialog } from "./view-password-dialog";
import { PasswordEntry } from "@/types/password";
import { deletePassword } from "../actions/passwords";

export function PasswordDashboard({ passwords }: { passwords: PasswordEntry[] }) {

  // Estado solo visual para el front (filtrar el mock y mostrar contraseñas).
  const [query, setQuery] = useState("");
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [detailEntry, setDetailEntry] = useState<PasswordEntry | null>(null);
  const [editEntry, setEditEntry] = useState<PasswordEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return passwords;
    return passwords.filter((p) =>
      [p.site, p.username, p.email, p.comments]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, passwords]);

  function toggleVisible(id: string) {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleDelete(id: string) {
    try {
      const confirmDialog = confirm("¿Estás seguro de que quieres eliminar esta contraseña?");
      if (!confirmDialog) return;
      await deletePassword(id);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-8 sm:py-10">
      {/* Encabezado + acciones */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="secondary" className="rounded-full">
            Mi bóveda
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Mis contraseñas
          </h1>
          <p className="mt-2 leading-7 text-muted-foreground">
            Tienes{" "}
            <span className="font-semibold text-foreground">
              {passwords.length} contraseñas
            </span>{" "}
            guardadas en tu bóveda.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* TODO(practica): aquí va tu exportación real a Excel. */}
          <Button type="button" variant="outline">
            <FileSpreadsheet aria-hidden="true" />
            Exportar a Excel
          </Button>
          <AddPasswordDialog />
        </div>
      </div>

      {/* Mini estadísticas (decorativas, calculadas del mock). */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="gap-2">
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <KeyRound aria-hidden="true" className="size-5" />
            </span>
            <div>
              <CardDescription>Total guardadas</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {passwords.length}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
        <Card className="gap-2">
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </span>
            <div>
              <CardDescription>Sitios únicos</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {new Set(passwords.map((p) => p.site)).size}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
        <Card className="gap-2">
          <CardHeader className="flex-row items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Search aria-hidden="true" className="size-5" />
            </span>
            <div>
              <CardDescription>Resultados del filtro</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {filtered.length}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Listado */}
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Listado de contraseñas</CardTitle>
              <CardDescription>
                Busca por sitio, usuario, correo o comentario.
              </CardDescription>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar contraseña…"
                aria-label="Buscar contraseña"
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sitio</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead className="hidden lg:table-cell">Correo</TableHead>
                  <TableHead>Contraseña</TableHead>
                  <TableHead className="hidden md:table-cell">Link</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Comentario
                  </TableHead>
                  <TableHead className="w-12 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => {
                  const visible = visibleIds.has(p.id);
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-semibold text-primary">
                            {p.site.charAt(0).toUpperCase()}
                          </span>
                          <span className="font-medium">{p.site}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.username}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground lg:table-cell">
                        {p.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <code className="min-w-24 text-xs tracking-wider">
                            {visible ? p.password : "••••••••••"}
                          </code>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-label={
                              visible
                                ? `Ocultar contraseña de ${p.site}`
                                : `Mostrar contraseña de ${p.site}`
                            }
                            onClick={() => toggleVisible(p.id)}
                          >
                            {visible ? (
                              <EyeOff aria-hidden="true" />
                            ) : (
                              <Eye aria-hidden="true" />
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-label={`Copiar contraseña de ${p.site}`}
                            title="Copiar"
                            onClick={() => {
                              navigator.clipboard.writeText(p.password);
                            }}
                          >
                            <Copy aria-hidden="true" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-40 items-center gap-1 text-primary underline-offset-4 hover:underline"
                          >
                            <ExternalLink
                              aria-hidden="true"
                              className="size-3.5 shrink-0"
                            />
                            <span className="truncate">
                              {p.link.replace(/^https?:\/\//, "")}
                            </span>
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden max-w-56 truncate text-muted-foreground xl:table-cell">
                        {p.comments || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Acciones para ${p.site}`}
                              >
                                <MoreHorizontal aria-hidden="true" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => setDetailEntry(p)}
                              >
                                <Eye aria-hidden="true" />
                                Ver detalle
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setEditEntry(p)}
                              >
                                <Pencil aria-hidden="true" />
                                Editar
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => handleDelete(p.id)}>
                              <Trash2 aria-hidden="true" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <SearchX aria-hidden="true" className="size-6" />
              </span>
              <p className="font-semibold">Sin resultados para “{query}”</p>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Prueba con otro sitio, usuario o correo, o limpia el filtro
                para ver todo el listado.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuery("")}
              >
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </CardContent>

        {filtered.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-muted-foreground sm:flex-row">
              <p className="tabular-nums">
                Mostrando {filtered.length} de {passwords.length}
              </p>
              {/* Paginación visual (decorativa). */}
              <div className="flex items-center gap-1.5">
                <Button type="button" variant="outline" size="icon-sm" disabled>
                  <ChevronLeft aria-hidden="true" />
                  <span className="sr-only">Página anterior</span>
                </Button>
                {/* <Badge variant="secondary">1</Badge> */}
                <Button type="button" variant="outline" size="icon-sm">
                  <span className="sr-only">Página 1</span>
                  1
                </Button>
                <Button type="button" variant="outline" size="icon-sm" disabled>
                  <ChevronRight aria-hidden="true" />
                  <span className="sr-only">Página siguiente</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Diálogos de detalle y edición (solo front, con datos del mock). */}
      {detailEntry && (
        <ViewPasswordDialog
          entry={detailEntry}
          onClose={() => setDetailEntry(null)}
          onEdit={(entry) => {
            setDetailEntry(null);
            setEditEntry(entry);
          }}
        />
      )}
      {editEntry && (
        <EditPasswordDialog
          entry={editEntry}
          onClose={() => setEditEntry(null)}
        />
      )}
    </div>
  );
}
