pipeline {
  agent any
  options { timestamps(); disableConcurrentBuilds() }

  stages {
    stage('Backend: Setup') {
      steps {
        dir('notes_project') {
          bat(/IF NOT EXIST venv (
  python -m venv venv
)
SET VENV=%CD%\venv
"%VENV%\Scripts\python.exe" -m pip install --upgrade pip
IF EXIST requirements.txt (
  "%VENV%\Scripts\python.exe" -m pip install -r requirements.txt
) ELSE (
  echo No requirements.txt found. Installing minimal deps...
  "%VENV%\Scripts\python.exe" -m pip install Django djangorestframework django-cors-headers
)/)
        }
      }
    }

    stage('Backend: Tests') {
      steps {
        dir('notes_project') {
          // If you want frontend to run even if tests fail, wrap with catchError:
          script {
            catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
              bat(/"%CD%\venv\Scripts\python.exe" -m django --version/)
              bat(/"%CD%\venv\Scripts\python.exe" manage.py test --noinput/)
            }
          }
        }
      }
    }

    stage('Frontend: Install') {
      steps {
        dir('notes-frontend') {
          bat(/IF EXIST package-lock.json (
  npm ci
) ELSE (
  npm install
)/)
        }
      }
    }

    stage('Frontend: Build') {
      steps {
        dir('notes-frontend') {
          bat(/npm run build/)
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline finished successfully.'
      archiveArtifacts artifacts: 'notes-frontend/build/**', fingerprint: true, onlyIfSuccessful: true
    }
    failure {
      echo '❌ Pipeline failed. Check stage logs.'
    }
    always {
      echo "Build URL: ${env.BUILD_URL}"
    }
  }
}
