import * as Model from "../model/ModelInterface.js";

export class Service {
  public static BASE_URL = "http://localhost:8080/";

  public static async POST_SaveLists(lists: Model.IState): Promise<void> {
    const res = await fetch(Service.BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lists),
    });
    const data = await res.json();
    console.log(data);
  }

  public static async GET_LoadLists(): Promise<Model.IState> {
    const res = await fetch(Service.BASE_URL);
    const data = await res.json();
    return data.data as Model.IState;
  }
}
