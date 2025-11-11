import { http, HttpResponse } from "msw";
import { loadEmployees, saveEmployees, nextId } from "./seed";

export const handlers = [
  // GET /employees
  http.get("/employees", async () => {
    const list = loadEmployees().sort((a, b) => a.name.localeCompare(b.name));
    return HttpResponse.json(list, { status: 200 });
  }),

  // POST /create  (you can duplicate as POST /employees if your app uses that)
  http.post("/create", async ({ request }) => {
    const body = (await request.json()) as any;
    if (!body?.name || !body?.age || !body?.country || !body?.position || !body?.wage) {
      return HttpResponse.json({ error: "missing fields" }, { status: 400 });
    }
    const list = loadEmployees();
    const newItem = {
      employee_id: nextId(list),
      name: String(body.name).trim(),
      age: Number(body.age),
      country: String(body.country).trim(),
      position: String(body.position).trim(),
      wage: Number(body.wage),
    };
    const next = [...list, newItem];
    saveEmployees(next);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  // GET /employees/:id
  http.get("/employees/:id", ({ params }) => {
    const id = Number(params.id);
    const item = loadEmployees().find((e) => e.employee_id === id);
    if (!item) return HttpResponse.json({ error: "Not found" }, { status: 404 });
    return HttpResponse.json(item, { status: 200 });
  }),

  // PUT /employees/:id
  http.put("/employees/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as any;
    const list = loadEmployees();
    const idx = list.findIndex((e) => e.employee_id === id);
    if (idx < 0) return HttpResponse.json({ error: "Not found" }, { status: 404 });

    const updated = {
      ...list[idx],
      name: String(body.name ?? list[idx].name).trim(),
      age: Number(body.age ?? list[idx].age),
      country: String(body.country ?? list[idx].country).trim(),
      position: String(body.position ?? list[idx].position).trim(),
      wage: Number(body.wage ?? list[idx].wage),
    };

    const next = [...list];
    next[idx] = updated;
    saveEmployees(next);
    return HttpResponse.json(updated, { status: 200 });
  }),

  // DELETE /employees/:id
  http.delete("/employees/:id", ({ params }) => {
    const id = Number(params.id);
    const list = loadEmployees();
    const next = list.filter((e) => e.employee_id !== id);
    if (next.length === list.length) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    saveEmployees(next);
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];
