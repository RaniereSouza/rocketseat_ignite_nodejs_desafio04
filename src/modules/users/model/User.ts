import { v4 as uuidV4 } from "uuid";

class User {
  id: string;
  created_at: Date;
  updated_at: Date;

  name: string;
  email: string;
  admin: boolean;

  constructor() {
    this.id = uuidV4();
    this.name = "";
    this.email = "";
    this.admin = false;

    return new Proxy<User>(this, {
      set(target, name, value) {
        const setables = ["name", "email", "admin"];
        const instance = target;

        if (
          (String(name) === "created_at" || String(name) === "updated_at") &&
          value instanceof Date
        ) {
          instance[name] = value;
          return true;
        }

        if (
          !setables.includes(String(name)) ||
          typeof instance[name] !== typeof value
        )
          throw new Error("Illegal attribute value update");

        instance[name] = value;
        instance.updated_at = new Date();
        return true;
      },
    });
  }
}

export { User };
