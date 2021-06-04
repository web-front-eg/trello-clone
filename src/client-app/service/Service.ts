import * as Model from "../model/ModelInterface.js";

export class Service {
  public static BASE_URL = "http://localhost:8080/";
  public static detectId: number = Math.floor(Math.random() * 10000000);

  public static async POST_SaveLists(lists: Model.IState): Promise<void> {
    const res = await fetch(Service.BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lists }),
    });
    const parsed = await res.json();
    // console.log(parsed);
  }

  public static async POST_DetectAnyChanges(
    original: Model.IState
  ): Promise<boolean> {
    console.log("sending -> ", original);
    
    const res = await fetch(`${Service.BASE_URL}detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lists: original, id: Service.detectId }),
    });
    const parsed = await res.json();
    // console.log(
    //   `Current Id: ${Service.detectId}, received Id: ${parsed.data.id}`
    // );
    const { anyChange, id } = parsed.data;

    if (id !== Service.detectId) {
      return false;
    }

    return anyChange as boolean;
  }

  public static async GET_LoadLists(): Promise<Model.IList[]> {
    const res = await fetch(Service.BASE_URL);
    const parsed = await res.json();
    // console.log(parsed);

    return parsed.data.lists as Model.IList[];
  }
}
