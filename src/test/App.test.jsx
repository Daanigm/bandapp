import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../App";

async function loginHelper() {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByPlaceholderText("admin"), "admin");
  await user.type(screen.getByPlaceholderText("••••••••"), "banda2026");
  await user.click(screen.getByText("Ingresar"));
  await waitFor(() => {
    expect(screen.getByText("Panel de Gestión")).toBeInTheDocument();
  });
  return user;
}

describe("Bandapp", () => {
  it("renders login page when not authenticated", () => {
    render(<App />);
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin")).toBeInTheDocument();
  });

  it("shows error on wrong credentials", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("admin"), "wrong");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrong");
    await user.click(screen.getByText("Ingresar"));
    await waitFor(() => {
      expect(screen.getByText(/Credenciales incorrectas/)).toBeInTheDocument();
    });
  });

  it("logs in successfully with correct credentials", async () => {
    await loginHelper();
    const dashboardElements = screen.getAllByText("Dashboard");
    expect(dashboardElements.length).toBeGreaterThanOrEqual(2);
  });

  it("shows dashboard metric cards after login", async () => {
    await loginHelper();
    const instrumentosEls = screen.getAllByText("Instrumentos");
    expect(instrumentosEls.length).toBeGreaterThanOrEqual(1);
    const uniformesEls = screen.getAllByText("Uniformes");
    expect(uniformesEls.length).toBeGreaterThanOrEqual(1);
  });

  it("navigates to instruments page", async () => {
    const user = await loginHelper();
    const navButtons = screen.getAllByText("Instrumentos");
    const sidebarBtn = navButtons.find((el) => el.closest("nav"));
    await user.click(sidebarBtn);
    await waitFor(() => {
      expect(screen.getByText("Trompeta Bb")).toBeInTheDocument();
    });
  });

  it("navigates to ensayos page", async () => {
    const user = await loginHelper();
    const navButtons = screen.getAllByText("Ensayos");
    const sidebarBtn = navButtons.find((el) => el.closest("nav"));
    await user.click(sidebarBtn);
    await waitFor(() => {
      expect(screen.getByText("Programar")).toBeInTheDocument();
    });
  });

  it("navigates to settings and changes band name", async () => {
    const user = await loginHelper();
    await user.click(screen.getByText("Configuración"));
    await waitFor(() => {
      expect(screen.getByText("Identidad de la Banda")).toBeInTheDocument();
    });
    const nameInput = screen.getByDisplayValue("Banda Municipal de Santa Cecilia");
    await user.clear(nameInput);
    await user.type(nameInput, "Mi Banda Nueva");
    await user.click(screen.getByText("Guardar Cambios"));
    await waitFor(() => {
      expect(screen.getByText("Guardado")).toBeInTheDocument();
    });
  });

  it("can logout from the dashboard", async () => {
    const user = await loginHelper();
    await user.click(screen.getByText("Cerrar Sesión"));
    await waitFor(() => {
      expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    });
  });

  it("shows upcoming rehearsals on dashboard", async () => {
    await loginHelper();
    expect(screen.getByText("Próximos Ensayos")).toBeInTheDocument();
  });

  it("shows low stock alerts on dashboard", async () => {
    await loginHelper();
    expect(screen.getByText("Alertas de Stock")).toBeInTheDocument();
  });
});
