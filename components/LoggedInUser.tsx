import { auth } from "@/auth";
import Image from "next/image";

export async function LoggedInUser() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
      <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User avatar"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg font-medium">
              {user.name?.charAt(0).toUpperCase() ||
                user.email?.charAt(0).toUpperCase() ||
                "?"}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-900 truncate">
          {user.name || user.email}
        </span>
      </div>
    </div>
  );
}
