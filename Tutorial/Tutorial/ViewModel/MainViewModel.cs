using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;

namespace Tutorial.ViewModel
{
    public partial class MainViewModel : ObservableObject
    {

        IConnectivity connectivity;
        public MainViewModel(IConnectivity connectivity)
        {
            Items = new ObservableCollection<string>();
            this.connectivity = connectivity;
        }


        // ObservableCollection to hold the items
        [ObservableProperty]
        ObservableCollection<string> items = new ObservableCollection<string>();

        // ObservableProperty to hold the text input
        [ObservableProperty]
        string text="";
      

        [RelayCommand]
        async Task Add()
        {
            if (string.IsNullOrWhiteSpace(Text))
            {
                return;
            }

            //accessing network access
            if (connectivity.NetworkAccess != NetworkAccess.Internet)
            {
                await Shell.Current.DisplayAlert("No Internet", "Please check your internet connection", "OK");
                return;
            }

            // Add the text to the collection and clear the input
            Items.Add(Text);
            Text = string.Empty;
        }

        [RelayCommand]
        private void Delete(string s)
        {
            if (Items.Contains(s))
            {
                Items.Remove(s);
            }
        }

        [RelayCommand]
        private async Task Tap(string s)
        {
            // Navigate to DetailPage with the item as a parameter
            await Shell.Current.GoToAsync($"{nameof(DetailPage)}?Text={s}");
        }
    }
}
