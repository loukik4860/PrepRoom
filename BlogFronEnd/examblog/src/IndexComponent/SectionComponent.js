import { Route, Routes } from "react-router-dom";
import { HomeComponent } from "../BlogAppComponent/HomeComponent";
import { LoginComponent } from "../AuthAppComponent/LoginComponent";
import { RegisterComponent } from "../AuthAppComponent/RegisterComponent";
import { ProfileComponent } from "../AuthAppComponent/ProfileComponent";
import { ChangePasswordComponent } from "../AuthAppComponent/ChangePasswordComponent";
import { ResetEmailComponent } from "../AuthAppComponent/ResetEmailComponent";
import { TagComponent } from "../BlogAppComponent/TagComponent";
import { AllBlogComponent } from "../BlogAppComponent/AllBlogComponent";
import { AuthorListComponent } from "../BlogAppComponent/AuthorListComponent";
import { AuthorDetailsComponent } from "../BlogAppComponent/AuthorDetails";
import { AuthenticationComponent } from "../AuthAppComponent/Authentication";
import { SingleBlogComponent } from "../BlogAppComponent/SingleBlogComponent";
import { TagDetailsComponent } from "../BlogAppComponent/TagDetailsComponent";
import { History } from "../SubjectComponents/HistoryComponent/History";
import { Geography } from "../SubjectComponents/GeographyComponent/Geography";
import { Polity } from "../SubjectComponents/PolityComponent/polity";
import { GeneralAwareness } from "../SubjectComponents/GeneralAwarenessComponents/GA";
import { CurrentAffairs } from "../SubjectComponents/CurrentAwarenessComponents/CA";
import { Economics } from "../SubjectComponents/EconomicsComponents/Economics";
import { CommissionComponent } from "../ExamComponent/CommissionComponents";
import { TopicComponent } from "../SubjectComponents/TopicComponent";
import { CategoryComponent } from "../BlogAppComponent/CategoryComponent";
import { English } from "../SubjectComponents/EnglishComponent/English";
import { AlsoReadComponent } from "../ExamComponent/AlsoReadComponent";
import { AddExamSection } from "../SubjectComponents/AddNotesComponent/AddExamSection";
import { AddCommission } from "../SubjectComponents/AddNotesComponent/AddCommissionComp";
import { AddExam } from "../SubjectComponents/AddNotesComponent/3AddExamComponent";
import { AddSubject } from "../SubjectComponents/AddNotesComponent/4AddSubjectComponent";
import { AddCategory } from "../SubjectComponents/AddNotesComponent/5AddCategoryModels";
import { AddChapter } from "../SubjectComponents/AddNotesComponent/6AddChapterComponent";
import { AddNotes } from "../SubjectComponents/AddNotesComponent/7AddNotesComponent";
import { FooterComp } from "./Footer";
import { AddImageComp } from "../SubjectComponents/AddNotesComponent/8ShowImagesComp";
import { AddImage } from "../SubjectComponents/AddNotesComponent/9AddImageComponent";
import { CreateBlog } from "../BlogAppComponent/CreateBlogComp";
import { AdminPage } from "../ExamComponent/AdminPage";
import { FileNotFound } from "../BlogAppComponent/FileNotFound";
import { NotificationComponent } from "../ExamComponent/NotificationComponent";

export function SectionComponent(){
    return(
        <div>
            <Routes>
                <Route path="/home" element={<HomeComponent/>}/>
                <Route path="/tags" element={<TagComponent/>}/>
                <Route path="/tagDetails/:id" element={<TagDetailsComponent/>} />
                <Route path="/allblog" element={<AllBlogComponent/>}/>
                <Route path="/createBlog" element={<CreateBlog/>}/>
                <Route path="/singleblog/:id" element={<SingleBlogComponent/>}/>
                <Route path="/allAuthor" element={<AuthorListComponent/>}/>
                <Route path="/authorDetails" element={<AuthorDetailsComponent/>}/>
                <Route path="/category" element={<CategoryComponent/>}/>
                <Route path="/footer" element={<FooterComp/>}/>
                <Route path="/AdminPage" element={<AdminPage/>}/>
                <Route path="/notification" element={<NotificationComponent/>}/>
                {/* -------------------------------------------- */}
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/registerAuthor" element={<RegisterComponent/>}/>
                <Route path="/Authentication" element={<AuthenticationComponent/>}/>
                <Route path="/authorComponent" element={<ProfileComponent/>}/>
                <Route path="/changePassword" element={<ChangePasswordComponent/>}/>
                <Route path="/resetEmail" element={<ResetEmailComponent/>}/>
                {/* -------------------------------------------- */}
                <Route path="/history" element={<History/>} />
                <Route path="/geography" element={<Geography/>}/>
                <Route path="/polity" element={<Polity/>}/>
                <Route path="/ga" element={<GeneralAwareness/>}/>
                <Route path="/ca" element={<CurrentAffairs/>}/>
                <Route path="/eco" element={<Economics/>}/>
                <Route path="/eng" element={<English/>}/>
                <Route path="/topic/:id" element={<TopicComponent/>}/>
                {/* ------------------------------------------------- */}
                <Route path="/addSection" element={<AddExamSection/>}/>
                <Route path="/addCommission" element={<AddCommission/>}/>
                <Route path="/addExam" element={<AddExam/>}/>
                <Route path="/addSubject" element={<AddSubject/>}/>
                <Route path="/addCategory" element={<AddCategory/>}/>
                <Route path="/addChapter" element={<AddChapter/>}/>
                <Route path="/addNote" element={<AddNotes/>}/>
                <Route path="/addImage" element={<AddImage/>}/>
                <Route path="/ImageShow" element={<AddImageComp/>}/>
                {/* -------------------------------------------- */}
                <Route path="/commissionList" element={<CommissionComponent/>}/>
                <Route path="/AlsoRead" element={<AlsoReadComponent/>}/>
                {/* -------------------------------------------- */}
                <Route path="/" element={<HomeComponent/>}/>
                <Route path="*" element={<FileNotFound/>}/>
            </Routes>
        </div>
    )
}