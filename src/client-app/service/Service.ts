import * as Model from "../model/ModelInterface.js";

/**
 * only deal with HTTP request to REST API
 */
export class Service {
  public static BASE_URL = "http://localhost:8080/";

  /**
   *
   * @param newChanges
   */
  public static async POST_SaveLists(newChanges: Model.IState) {
    await fetch(Service.BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newChanges }),
    });
  }

  /**
   * @param original
   */
  public static async POST_DetectAnyChanges(original: Model.IState) {
    console.log("start detecting: ", original);

    const res = await fetch(`${Service.BASE_URL}detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ incoming: original }),
    });
    const parsed = await res.json();
    const { anyChange } = parsed.data;

    return anyChange as boolean;
  }

  /**
   *
   */
  public static async GET_LoadLists() {
    const res = await fetch(Service.BASE_URL, { method: "GET" });
    const parsed = await res.json();

    const { lists } = parsed.data;
    return lists as Model.IList[];
  }
}
