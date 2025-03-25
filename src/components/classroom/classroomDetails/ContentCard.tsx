import { IContent } from "@/types/content";
import { IJwtDecodedUser, IUser } from "@/types/user";
import { BellRing, Notebook } from "lucide-react";
import  moment from "moment"
import Link from "next/link";
const ContentCard = ({
  content,
  faculty,
  currentUser,
}: {
  content: IContent;
  faculty: IUser;
  currentUser: IJwtDecodedUser;
}) => {
  const createdAt = moment(content.createdAt)
  return (
    <Link href={`/my-classes/${content.classroom}/${content._id}`} className="py-4 px-6 border hover:shadow-md shadow-2xs duration-200 border-gray-300 rounded-xl flex items-center gap-4 cursor-pointer">
      <p className="text-green-700">
        {content.contentFiles.length + content.contentLinks.length > 0 ? (
          <Notebook />
        ) : (
          <BellRing />
        )}
      </p>
      <div>
        <p>
          <span className="text-gray-600">
            {faculty._id === currentUser._id ? "You" : faculty.name} uploaded
            new material :
          </span>{" "}
          {content.title}
        </p>
        <p className="text-xs text-gray-600 mt-2">{createdAt.fromNow()}</p>
      </div>
    </Link>
  );
};

export default ContentCard;
