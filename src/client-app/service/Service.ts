import * as Model from "../model/ModelInterface.js";

export class Service {
  public static BASE_URL = "http://localhost:8080/";

  public static async POST_SaveLists(lists: Model.IState): Promise<void> {
    const res = await fetch(Service.BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lists),
    });
    const parsed = await res.json();
    console.log(parsed);
  }

  public static async POST_DetectAnyChanges(
    original: Model.IState
  ): Promise<boolean> {
    const res = await fetch(`${Service.BASE_URL}detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(original),
    });
    const parsed = await res.json();
    return parsed.data as boolean;
  }

  public static async GET_LoadLists(): Promise<Model.IState> {
    const res = await fetch(Service.BASE_URL);
    const parsed = await res.json();
    return parsed.data as Model.IState;
  }
}
