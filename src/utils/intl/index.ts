import { DEBUG } from 'app/shared/constants';
import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: DEBUG,
  saveMissing: true,
  resources: {
    en: {
      translation: {
        home: 'Home',
        signup: 'Sign Up',
        signin: 'Sign In',
        email: 'Email',
        password: 'Password',
        form: 'Form',
        email_error: 'Please input your email',
        password_error: 'Please input your password!',
        unknown_error: 'Sorry, something went wrong',
        user_created: 'Account successfully created',
        user_exist: 'Sorry account already exits',
        user_exist2: 'Sorry account already exits. Please sign in',
        logged_in: 'You are now logged in',
        login_signup: 'Login | Sign up',
        resources: 'Resources',
        about_us: 'About Us',
        logout: 'Logout',
        logout_ok: 'You are now logged out',
        logout_failed: 'Sorry failed to logout, please try again',
        app_beta_note:
          "🚀 Get ready to embark on an educational journey like never before with Sparked Next, the evolution of modern learning! We're thrilled to unveil the next chapter of our educational app, and it's packed with innovative features and enhancements that will elevate your learning experience.",
        admin: 'Admin',
        courses: 'Courses',
        dashboard: 'Dashboard',
        yes_im_sure: "Yes, I'm sure",
        no_cancel: 'No, cancel',
        deletion_confirmation_singular: 'Are you sure you want to delete this item?',
        deletion_confirmation_plural: 'Are you sure you want to delete these items?',

        create_unit: 'Create a New Unit',
        create_user: 'Create a New User',
        create_topic: 'Create a New Topic',
        create_school: 'Create a New School',
        create_course: 'Create a New Course',
        create_grade: 'Create a New Grade',
        create_program: 'Create a New Program',
        create_resource: 'Create a New Resource',
        create_subject: 'Create a New Subject',

        edit_unit: 'Edit Unit',
        edit_user: 'Edit a User',
        edit_topic: 'Edit Topic',
        edit_school: 'Edit a School',
        edit_course: 'Edit Course',
        edit_subject: 'Edit Subject',
        edit_grade: 'Edit Grade',
        edit_program: 'Edit a Program',
        edit_media_content: 'Edit Media Content',

        unit_created: 'Unit created successfully',
        topic_created: 'Topic created successfully',
        school_created: 'School created successfully',
        course_created: 'Course created successfully',
        grade_created: 'Grade created successfully',
        subject_created: 'Subject created successfully',
        program_created: 'Program created successfully',
        resource_created: 'Resource created successfully',

        topics_found: 'topics found',
        media_content_found: 'media content found',
        units_found: 'units found',
        programs_found: 'programs found',
        schools_found: 'schools found',
        users_found: 'users found',
        grade_found: 'grade found',
        subject_found: 'subject found',

        search_items: 'Search Items',

        name: 'Name',
        description: 'Description',
        school: 'School',
        program: 'Program',
        course: 'Course',
        topic: 'Topic',
        grade: 'Grade',

        submit: 'Submit',
        update: 'Update',
        upload_file: 'Upload File',
        upload_thumbnail: 'Upload Thumbnail (optional)',

        users: 'Users',
        units: 'Units',
        topics: 'Topics',
        schools: 'Schools',
        programs: 'Programs',
        media_content: 'Media Content',
        statistics: 'Statistics',
        feedback: 'Feedback',
        grades: 'Grades',
        subjects: 'Subjects',

        new: 'New',
        delete: 'Delete',
        upload_multiple: 'Upload Multiple',
        next: 'Next',
        step_1_select_topic: 'Step 1: Select Topic',
        step_2_select_files: 'Step 2: Select Files',
        step_3_edit_resources: 'Step 3: Edit Resource Data',

        select_items: 'Select some items',
        select_one_item: 'Select one item',
        search_empty: 'Please enter some search text',
        wait: 'Please wait for the current operation to complete',
        success: 'The operation was successfully completed',
        no_file: 'No file was provided',
        failed_to_upload: 'Failed to upload',
        failed_with_error_code: 'The operation failed with an error code',
      },
    },
  },
});
