
const howToGuide = {
    "faculty": [
      {
        "heading": "Account Registration and Login",
        "steps": [
          "Go to the Classync website or open the application.",
          "Click on \"Register\".",
          "Select the \"Faculty\" role.",
          "Fill in the required information (e.g., name, email, password, Id, Profile Image).",
          "Click \"Submit\".",
          "Log in using your registered email or id and password."
        ]
      },
      {
        "heading": "Creating a Classroom",
        "steps": [
          "Log in to your faculty account.",
          "Navigate to the \"Create Classroom\"  section.",
          "Enter the required fields with class time and class days.",
          "Click \"Submit\". Your new classroom will now appear in your my classrooms page."
        ]
      },
      {
        "heading": "Uploading Class Contents",
        "steps": [
          "Go to \"My Classrooms\" and select the classroom you want to add content to.",
          "Find the \"Upload\" section within the classroom.",
          "Choose the type of content (e.g., File, Link, Text).",
          "Add a title and optional description for the content.",
          "Click \"Upload\". The content will now be available for students in this classroom."
        ]
      },
      {
        "heading": "Generating Attendance QR Code",
        "steps": [
          "Select the specific classroom for which you want to take attendance.",
          "Click the \"Generate QR Code\" button.",
          "A unique QR code for the current session will be displayed.",
          "Project this QR code in your physical classroom or share it on your screen during online sessions for students to scan. The QR code is typically time-sensitive."
        ]
      },
      {
        "heading": "Managing Classroom Students",
        "steps": [
          "Go to your  \"Dashboard\" route.",
          "Select the classroom you want to manage.",
          "Here you can see the list of enrolled students. Options to remove a student might be available."
        ]
      },
      {
        "heading": "Managing Chat Requests from Students",
        "steps": [
          "Navigate to the \"Dashboard\" section.",
          "Go to the \"Requests\" or \"Pending Chats\" tab.",
          "You will see a list of students who have requested to chat with you.",
          "Click \"Accept\" to open a dialog to select chat schedule or \"Reject\" if necessary."
        ]
      },
      {
        "heading": "Chatting with Students",
        "steps": [
          "Go to the \"Messages\" or \"Chat\" section.",
          "Under your active conversations, select the student you wish to chat with.",
          "Type your message in the text box and press Enter or click \"Send\".",
          "Each chat will stay active for 30 minutes."
        ]
      },
      {
        "heading": "Seeing Class Routine",
        "steps": [
          "Log in to your faculty account.",
          "Your dashboard section will display the schedule for the classes you are teaching."
        ]
      }
    ],
    "student": [
      {
        "heading": "Account Registration and Login",
       "steps": [
          "Go to the Classync website or open the application.",
          "Click on \"Register\".",
          "Select the \"Student\" role.",
          "Fill in the required information (e.g., name, email, password, Id, Profile Image).",
          "Click \"Submit\".",
          "Log in using your registered email or id and password."
        ]
      },
      {
        "heading": "Joining Classrooms Created by Faculty",
        "steps": [
          "Log in to your student account.",
          "Navigate to the \"Join Classroom\" section.",
          "Enter the **Classroom Code** provided by the faculty or classmates .",
          "Click \"Join\". The classroom will now appear in your list."
        ]
      },
      {
        "heading": "Mark Attendance by Scanning QR Code",
        "steps": [
          "Be present in the physical or virtual class session where the faculty member is displaying the QR code.",
          "Open the Classync website on your device.",
          "Navigate to the specific classroom.",
          "Find the  \"Mark Attendance\" section.",
          "Grant camera permission to the app if requested.",
          "Point your device's camera at the QR code displayed by the faculty.",
          "Your attendance should be marked automatically upon successful scan. Look for a confirmation message."
        ]
      },
      {
        "heading": "Request to Chat with Faculty",
        "steps": [
          "Go to the specific classroom where the faculty member teaches.",
          "Click on the \"Request Chat\" button.",
          "Click the button to send a chat request. The faculty member will need to accept your request before you can send messages."
        ]
      },
      {
        "heading": "See Class Attendance",
        "steps": [
          "Log in to your student account.",
          "Go to the \"Dashboard\" section.",
          "Navigate to the \"Attendance\" tab.",
          "Here you can see your attendance history for each class."
        ]
      },
      {
        "heading": "Access Class Contents",
        "steps": [
          "Log in to your student account.",
          "Go to the \"My Classrooms\" section and select the relevant classroom.",
          "Navigate to the \"Content\" or \"Materials\" section.",
          "You will see a list of files, links, and other resources uploaded by your faculty. Click on an item to view or download it."
        ]
      },
      {
        "heading": "Seeing Class Routine",
        "steps": [
          "Log in to your faculty account.",
          "Your dashboard section will display the schedule for the classes you are teaching."
        ]
      }
    ]
  }

const HowToPage = () => {
  return (
    <div className="md:py-10 px-4 md:px-[6vw] py-6">
         <h1 className=" text-center md:text-4xl text-2xl  ">How to use <span className="logo md:text-5xl text-3xl">Classync</span></h1>
         <div className="mt-20">

         <h4 className="text-3xl  mt-8">For Faculty</h4>
         {
             howToGuide.faculty.map((guide, idx)=> <div key={idx}>
                <h5 className="text-xl mt-6 text-[#63c377] mb-2">{guide.heading}</h5>
                <div>
                    {
                        (guide.steps.map((step, idx) =><p key={idx}>{idx+1}. {step}</p>))
                    }
                </div>
            </div>)
         }
         </div>
         <div>

         <h4 className="text-3xl  mt-8">For Students</h4>
         {
             howToGuide.student.map((guide, idx)=> <div key={idx}>
                <h5 className="text-xl mt-6 text-[#63c377] mb-2">{guide.heading}</h5>
                <div>
                    {
                        (guide.steps.map((step, idx) =><p key={idx}>{idx+1}. {step}</p>))
                    }
                </div>
            </div>)
         }
         </div>
    </div>
  )
}

export default HowToPage