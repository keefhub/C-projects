using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Maui.Controls; // Ensure this namespace is included for QueryProperty attribute

namespace Tutorial.ViewModel
{
    [QueryProperty("Text", "Text")]
    public partial class DetailViewModel : ObservableObject
    {
        // Define the observable property
        [ObservableProperty]
        string text = "";

        [RelayCommand]
        async Task GoBack()
        {
            // ../../ to go back 2 pages
            await Shell.Current.GoToAsync("..");
        }

    }
}
