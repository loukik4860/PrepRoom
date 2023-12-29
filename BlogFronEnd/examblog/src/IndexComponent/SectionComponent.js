import { Navigate, Route, Routes } from "react-router-dom";
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
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { NotificationTable } from "../ExamComponent/NotificationTable";
import { HistoryCarasoul } from "../BlogAppComponent/HomeCarasoul/HistoryCarasoul";
import { GACarasoul } from "../BlogAppComponent/HomeCarasoul/GACarasoul";
import { CACarasoul } from "../BlogAppComponent/HomeCarasoul/CACarasoul";
import { PolityCarasoul } from "../BlogAppComponent/HomeCarasoul/PolityCarasoul";
import { GeographyCarasoul } from "../BlogAppComponent/HomeCarasoul/GeographyCarasoul";
import { EcoCarasoul } from "../BlogAppComponent/HomeCarasoul/EcoCarasoul";
import { EnglishCarasoul } from "../BlogAppComponent/HomeCarasoul/EnglishCarasoul";
import { Notification } from "../ExamComponent/Notification";
import { UserLogin } from "../AuthAppComponent/UserLogin/UserLogin";


export function SectionComponent(){
    const { access_token } = useSelector(state=>state.auth)
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
                <Route path="/notificationTable" element={<NotificationTable/>}/>
                <Route path="/noti" element={<Notification/>}/>
                {/* -------------------------------------------- */}
                <Route path="/historyCarasoul" element={<HistoryCarasoul/>}/>
                <Route path="/GACarasoul" element={<GACarasoul/>}/>
                <Route path="/CACarasoul" element={<CACarasoul/>}/>
                <Route path="/polityCarasoul" element={<PolityCarasoul/>}/>
                <Route path="/geographyCarasou" element={<GeographyCarasoul/>}/>
                <Route path="/EcoCarasousel" element={<EcoCarasoul/>}/>
                <Route path="/englishCarasousel" element={<EnglishCarasoul/>}/>
                {/* -------------------------------------------- */}
                <Route path="/login" element={!access_token ? <LoginComponent/>: <Navigate to="/Authentication"/>}/>
                <Route path="/registerAuthor" element={!access_token ? <RegisterComponent/>:<Navigate to="/Authentication"/>}/>
                <Route path="/Authentication" element={ !access_token ? <AuthenticationComponent/> : <Navigate to="/AdminPage"/> }/>
                <Route path="/authorProfile" element={access_token ? <ProfileComponent/> : <Navigate to="/home"/>} />
                <Route path="/changePassword" element={access_token ? <ChangePasswordComponent/>:<HomeComponent/>}/>
                <Route path="/resetEmail" element={<ResetEmailComponent/>}/>
                {/* -------------------------------------------- */}
                <Route path="/userLogin" element={<UserLogin/>}/>
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
                <Route path="/addSection" element={access_token ? <AddExamSection/>: <AuthenticationComponent/>}/>
                <Route path="/addCommission" element={access_token ? <AddCommission/>: <AuthenticationComponent/>}/>
                <Route path="/addExam" element={access_token ? <AddExam/>: <AuthenticationComponent/>}/>
                <Route path="/addSubject" element={access_token ? <AddSubject/>: <AuthenticationComponent/>}/>
                <Route path="/addCategory" element={access_token ? <AddCategory/>: <AuthenticationComponent/>}/>
                <Route path="/addChapter" element={access_token ? <AddChapter/>: <AuthenticationComponent/>}/>
                <Route path="/addNote" element={access_token ? <AddNotes/>: <AuthenticationComponent/>}/>
                <Route path="/addImage" element={access_token ? <AddImage/>: <AuthenticationComponent/>}/>
                <Route path="/ImageShow" element={access_token ? <AddImageComp/>: <AuthenticationComponent/>}/>
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